/**
 * OmdcBarcode — renders an OMDC code as a real, scannable Code128-B barcode
 * (the bar widths genuinely encode the string) with the human-readable code
 * underneath. A compact, on-brand component used on the kiosk ticket, the
 * mobile profile card and booking confirmations.
 */

// Canonical Code128 module-width table (values 0–106). Each entry is six
// alternating bar/space widths; the final Stop symbol carries a 7th bar.
const CODE128_PATTERNS = [
  '212222','222122','222221','121223','121322','131222','122213','122312','132212','221213',
  '221312','231212','112232','122132','122231','113222','123122','123221','223211','221132',
  '221231','213212','223112','312131','311222','321122','321221','312212','322112','322211',
  '212123','212321','232121','111323','131123','131321','112313','132113','132311','211313',
  '231113','231311','112133','112331','132131','113123','113321','133121','313121','211331',
  '231131','213113','213311','213131','311123','311321','331121','312113','312311','332111',
  '314111','221411','431111','111224','111422','121124','121421','141122','141221','112214',
  '112412','122114','122411','142112','142211','241211','221114','413111','241112','134111',
  '111242','121142','121241','114212','124112','124211','411212','421112','421211','212141',
  '214121','412121','111143','111341','131141','114113','114311','411113','411311','113141',
  '114131','311141','411131','211412','211214','211232','2331112',
];

const START_B = 104;
const STOP = 106;

/** Encode an ASCII string (Code Set B charset) into Code128 symbol values. */
function encodeCode128B(text: string): number[] {
  const values: number[] = [START_B];
  for (const ch of text) {
    const v = ch.charCodeAt(0) - 32; // Code B: ASCII 32–126 → 0–94
    values.push(v >= 0 && v <= 94 ? v : 0);
  }
  let sum = START_B;
  values.slice(1).forEach((v, i) => { sum += v * (i + 1); });
  values.push(sum % 103); // checksum
  values.push(STOP);
  return values;
}

/** Expand symbol values into an array of bar widths (alternating bar/space). */
function toBars(values: number[]): { width: number; bar: boolean }[] {
  const bars: { width: number; bar: boolean }[] = [];
  for (const v of values) {
    const pattern = CODE128_PATTERNS[v] ?? CODE128_PATTERNS[0];
    for (let i = 0; i < pattern.length; i++) {
      bars.push({ width: parseInt(pattern[i], 10), bar: i % 2 === 0 });
    }
  }
  return bars;
}

interface OmdcBarcodeProps {
  code: string;
  /** Drawn height of the bars in px. */
  height?: number;
  /** Module (thinnest bar) width in px. */
  moduleWidth?: number;
  /** Show the human-readable code under the bars. */
  showText?: boolean;
  barColor?: string;
  background?: string;
  style?: React.CSSProperties;
}

export function OmdcBarcode({
  code,
  height = 64,
  moduleWidth = 2,
  showText = true,
  barColor = '#0D1421',
  background = '#FFFFFF',
  style,
}: OmdcBarcodeProps) {
  const bars = toBars(encodeCode128B(code));
  const totalModules = bars.reduce((sum, b) => sum + b.width, 0);
  const width = totalModules * moduleWidth;

  let x = 0;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8, ...style }}>
      <div style={{ background, padding: '10px 14px', borderRadius: 12 }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ display: 'block' }}
          role="img"
          aria-label={`Barcode ${code}`}
        >
          {bars.map((b, i) => {
            const w = b.width * moduleWidth;
            const rect = b.bar ? (
              <rect key={i} x={x} y={0} width={w} height={height} fill={barColor} />
            ) : null;
            x += w;
            return rect;
          })}
        </svg>
      </div>
      {showText && (
        <div
          className="kd"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', monospace",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: '0.18em',
            color: barColor,
          }}
        >
          {code}
        </div>
      )}
    </div>
  );
}
