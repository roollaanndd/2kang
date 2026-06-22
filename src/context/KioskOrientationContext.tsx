import { createContext, useContext, type ReactNode } from 'react';

export type KioskOrientation = 'landscape' | 'portrait';

const KioskOrientationContext = createContext<KioskOrientation>('landscape');

export function KioskOrientationProvider({
  orientation,
  children,
}: {
  orientation: KioskOrientation;
  children: ReactNode;
}) {
  return (
    <KioskOrientationContext.Provider value={orientation}>
      {children}
    </KioskOrientationContext.Provider>
  );
}

/** Read the active kiosk orientation inside any kiosk screen/component. */
export function useKioskOrientation(): KioskOrientation {
  return useContext(KioskOrientationContext);
}

/** Convenience: true when the kiosk is running in portrait mode. */
export function useIsPortrait(): boolean {
  return useContext(KioskOrientationContext) === 'portrait';
}
