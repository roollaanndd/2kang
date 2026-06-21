/**
 * kioskSound — tiny Web Audio helper for soft UI feedback tones.
 *
 * Plays short, gentle oscillator+gain envelopes for kiosk touch interactions.
 * A single AudioContext is created lazily on the first call (and resumed if
 * suspended) to respect browser autoplay-after-gesture policies. Everything is
 * wrapped in try/catch and silently no-ops if Web Audio is unavailable.
 *
 * No external assets — all tones are synthesized.
 */

export type KioskSoundKind = 'tap' | 'select' | 'success' | 'error';

interface ToneStep {
  /** Frequency in Hz */
  freq: number;
  /** When to start, relative to play time, in seconds */
  at: number;
  /** Tone length in seconds */
  dur: number;
  /** Peak gain for this step (kept low — gentle) */
  gain?: number;
  /** Oscillator waveform */
  type?: OscillatorType;
}

const BASE_GAIN = 0.04; // gentle, low volume

const TONES: Record<KioskSoundKind, ToneStep[]> = {
  // Light single blip for generic touches
  tap: [{ freq: 660, at: 0, dur: 0.09, type: 'sine' }],
  // Two-note soft "pick" for selections
  select: [
    { freq: 587.33, at: 0, dur: 0.08, type: 'sine' },
    { freq: 880, at: 0.07, dur: 0.11, type: 'sine' },
  ],
  // Pleasant ascending triad for confirmations
  success: [
    { freq: 523.25, at: 0, dur: 0.1, type: 'sine' },
    { freq: 659.25, at: 0.09, dur: 0.1, type: 'sine' },
    { freq: 783.99, at: 0.18, dur: 0.15, type: 'sine' },
  ],
  // Soft low double for errors (never harsh)
  error: [
    { freq: 311.13, at: 0, dur: 0.12, type: 'triangle', gain: 0.05 },
    { freq: 246.94, at: 0.13, dur: 0.16, type: 'triangle', gain: 0.05 },
  ],
};

let ctx: AudioContext | null = null;

function getContext(): AudioContext | null {
  try {
    if (typeof window === 'undefined') return null;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    // Resume if the browser suspended it (autoplay policy) — safe to call repeatedly.
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

/**
 * Play a short, soft UI feedback tone. No-ops silently if Web Audio is
 * unavailable or anything goes wrong.
 */
export function kioskSound(kind: KioskSoundKind = 'tap'): void {
  try {
    const audio = getContext();
    if (!audio) return;

    const steps = TONES[kind] ?? TONES.tap;
    const now = audio.currentTime;

    for (const step of steps) {
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      const peak = step.gain ?? BASE_GAIN;
      const start = now + step.at;
      const end = start + step.dur;

      osc.type = step.type ?? 'sine';
      osc.frequency.setValueAtTime(step.freq, start);

      // Quick attack, smooth exponential release — soft, no clicks.
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);

      osc.connect(gain);
      gain.connect(audio.destination);

      osc.start(start);
      osc.stop(end + 0.02);
    }
  } catch {
    /* no-op — never let sound break the UI */
  }
}

export default kioskSound;
