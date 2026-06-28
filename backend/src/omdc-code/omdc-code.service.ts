import { Injectable } from '@nestjs/common';

const ALPHABET = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const BASE = ALPHABET.length;

export type OmdcCodeKind = 'member' | 'transaction' | 'booking';

const PREFIX: Record<OmdcCodeKind, string> = {
  member: 'OMDC-M-',
  transaction: 'OMDC-T-',
  booking: 'OMDC-B-',
};

export interface ParsedOmdcCode {
  valid: boolean;
  kind?: OmdcCodeKind;
  key?: string;
  code?: string;
}

@Injectable()
export class OmdcCodeService {
  private hash32(input: string): number {
    let h = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return h >>> 0;
  }

  private encodeBase(n: number, width: number): string {
    let out = '';
    let v = n >>> 0;
    for (let i = 0; i < width; i++) {
      out = ALPHABET[v % BASE] + out;
      v = Math.floor(v / BASE);
    }
    return out;
  }

  private checkChar(body: string): string {
    let sum = 0;
    for (let i = 0; i < body.length; i++) {
      sum = (sum + ALPHABET.indexOf(body[i]) * (i + 2)) % BASE;
    }
    return ALPHABET[sum];
  }

  private normalize(raw: string): string {
    return raw
      .toUpperCase()
      .replace(/[^0-9A-Z-]/g, '')
      .replace(/O/g, '0')
      .replace(/I/g, '1')
      .trim();
  }

  memberCode(userId: string): string {
    const body = this.encodeBase(this.hash32('member:' + userId), 4);
    return PREFIX.member + body + this.checkChar(body);
  }

  transactionCode(seed?: string): string {
    const entropy = `${seed ?? ''}:${Date.now()}:${Math.floor(Math.random() * 0xffff)}`;
    const body = this.encodeBase(this.hash32('txn:' + entropy), 5);
    return PREFIX.transaction + body + this.checkChar(body);
  }

  bookingCode(): string {
    let out = '';
    for (let i = 0; i < 6; i++) {
      out += ALPHABET[Math.floor(Math.random() * BASE)];
    }
    return out;
  }

  bookingBarcodeValue(code: string): string {
    const body = code.toUpperCase();
    return PREFIX.booking + body + this.checkChar(body);
  }

  extractBookingCode(raw: string): string | null {
    const norm = this.normalize(raw);
    const parsed = this.parseOmdcCode(norm);
    if (parsed.valid && parsed.kind === 'booking' && parsed.key) return parsed.key;
    const compact = norm.replace(/[^0-9A-Z]/g, '');
    if (compact.length >= 6) return compact.slice(-6);
    return compact.length >= 4 ? compact : null;
  }

  parseOmdcCode(raw: string): ParsedOmdcCode {
    const code = this.normalize(raw);
    for (const kind of ['member', 'transaction', 'booking'] as const) {
      const prefix = PREFIX[kind];
      if (!code.startsWith(prefix)) continue;
      const payload = code.slice(prefix.length);
      if (payload.length < 2) return { valid: false };
      const body = payload.slice(0, -1);
      const check = payload.slice(-1);
      if (this.checkChar(body) !== check) return { valid: false, kind, code };
      return { valid: true, kind, key: body, code };
    }
    return { valid: false };
  }

  isValidOmdcCode(raw: string): boolean {
    return this.parseOmdcCode(raw).valid;
  }
}
