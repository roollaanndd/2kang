const WS_URL = import.meta.env.VITE_WS_URL || import.meta.env.VITE_API_URL || '';

type EventHandler = (data: any) => void;

let socket: WebSocket | null = null;
const handlers = new Map<string, Set<EventHandler>>();

export function connectQueue(branchId?: string, userId?: string) {
  if (!WS_URL) return;

  const url = `${WS_URL.replace(/^http/, 'ws')}/queue`;
  socket = new WebSocket(url);

  socket.onopen = () => {
    if (branchId) send('join-branch', { branchId });
    if (userId) send('join-patient', { userId });
  };

  socket.onmessage = (event) => {
    try {
      const { event: eventName, data } = JSON.parse(event.data);
      const fns = handlers.get(eventName);
      if (fns) fns.forEach((fn) => fn(data));
    } catch {
      // ignore malformed messages
    }
  };

  socket.onclose = () => {
    setTimeout(() => connectQueue(branchId, userId), 3000);
  };
}

export function send(event: string, data: any) {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ event, data }));
  }
}

export function onQueueUpdate(handler: EventHandler): () => void {
  return on('queue-update', handler);
}

export function onNotification(handler: EventHandler): () => void {
  return on('notification', handler);
}

export function onBroadcast(handler: EventHandler): () => void {
  return on('broadcast', handler);
}

function on(event: string, handler: EventHandler): () => void {
  if (!handlers.has(event)) handlers.set(event, new Set());
  handlers.get(event)!.add(handler);
  return () => handlers.get(event)?.delete(handler);
}

export function disconnectQueue() {
  socket?.close();
  socket = null;
  handlers.clear();
}
