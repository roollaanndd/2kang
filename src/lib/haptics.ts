/**
 * Lightweight haptic feedback helper.
 * Uses the Vibration API where available (Android / supported browsers);
 * silently no-ops elsewhere (iOS Safari, desktop). Safe to call anywhere.
 */

type HapticKind = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

const PATTERNS: Record<HapticKind, number | number[]> = {
  light: 8,
  medium: 14,
  heavy: 22,
  selection: 5,
  success: [10, 40, 18],
  warning: [16, 60, 16],
  error: [24, 50, 24, 50, 24],
};

export function haptic(kind: HapticKind = 'light') {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
  try {
    navigator.vibrate(PATTERNS[kind]);
  } catch {
    /* ignore — vibration unsupported or blocked */
  }
}
