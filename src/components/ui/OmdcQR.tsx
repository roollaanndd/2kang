import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface OmdcQRProps {
  code: string;
  size?: number;
  showText?: boolean;
  fgColor?: string;
  bgColor?: string;
  style?: React.CSSProperties;
}

export function OmdcQR({
  code,
  size = 160,
  showText = true,
  fgColor = '#0D1421',
  bgColor = '#FFFFFF',
  style,
}: OmdcQRProps) {
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    let cancelled = false;
    QRCode.toString(code, {
      type: 'svg',
      errorCorrectionLevel: 'M',
      margin: 1,
      color: { dark: fgColor, light: bgColor },
    }).then(out => {
      if (!cancelled) setSvg(out);
    });
    return () => { cancelled = true; };
  }, [code, fgColor, bgColor]);

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8, ...style }}>
      <div
        style={{
          background: bgColor,
          padding: 12,
          borderRadius: 14,
          width: size,
          height: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      {showText && (
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', monospace",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: '0.14em',
            color: fgColor,
          }}
        >
          {code}
        </div>
      )}
    </div>
  );
}
