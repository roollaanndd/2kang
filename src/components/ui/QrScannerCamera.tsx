import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { BrowserQRCodeReader } from '@zxing/browser';

interface QrScannerCameraProps {
  onScan: (rawText: string) => void;
  onError?: (err: Error) => void;
  active: boolean;
}

export function QrScannerCamera({ onScan, onError, active }: QrScannerCameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const readerRef = useRef<BrowserQRCodeReader | null>(null);
  const controlsRef = useRef<{ stop: () => void } | null>(null);
  const [camError, setCamError] = useState<string | null>(null);

  useEffect(() => {
    if (!active) {
      controlsRef.current?.stop();
      controlsRef.current = null;
      return;
    }

    const reader = new BrowserQRCodeReader();
    readerRef.current = reader;

    reader
      .decodeFromVideoDevice(undefined, videoRef.current!, (result, err, controls) => {
        controlsRef.current = controls;
        if (result) {
          onScan(result.getText());
        } else if (err && !(err.name === 'NotFoundException')) {
          setCamError(err.message);
          onError?.(err as Error);
        }
      })
      .catch(err => {
        setCamError('Camera unavailable');
        onError?.(err);
      });

    return () => {
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
  }, [active]);

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1', borderRadius: 20, overflow: 'hidden', background: '#0D1421' }}>
      <video
        ref={videoRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        muted
        playsInline
      />

      {/* Scanning reticle */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{ position: 'relative', width: '60%', aspectRatio: '1' }}>
          {/* Corner brackets */}
          {(['tl', 'tr', 'bl', 'br'] as const).map(corner => (
            <div key={corner} style={{
              position: 'absolute',
              width: 28, height: 28,
              ...(corner.includes('t') ? { top: 0 } : { bottom: 0 }),
              ...(corner.includes('l') ? { left: 0 } : { right: 0 }),
              borderTop: corner.includes('t') ? '3px solid #E91E8C' : 'none',
              borderBottom: corner.includes('b') ? '3px solid #E91E8C' : 'none',
              borderLeft: corner.includes('l') ? '3px solid #E91E8C' : 'none',
              borderRight: corner.includes('r') ? '3px solid #E91E8C' : 'none',
              borderRadius: corner === 'tl' ? '6px 0 0 0' : corner === 'tr' ? '0 6px 0 0' : corner === 'bl' ? '0 0 0 6px' : '0 0 6px 0',
            }} />
          ))}

          {/* Animated scan line */}
          <motion.div
            animate={{ top: ['10%', '90%', '10%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', left: 0, right: 0, height: 2,
              background: 'linear-gradient(90deg, transparent, #E91E8C, transparent)',
              boxShadow: '0 0 8px rgba(233,30,140,0.8)',
            }}
          />
        </div>
      </div>

      {/* Error overlay */}
      {camError && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(13,20,33,0.85)', color: 'white',
          fontSize: 14, fontWeight: 600, gap: 8, padding: 20, textAlign: 'center',
        }}>
          <span style={{ fontSize: 32 }}>📷</span>
          <span>Kamera tidak tersedia</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{camError}</span>
        </div>
      )}
    </div>
  );
}
