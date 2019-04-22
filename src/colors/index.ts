export * from './full';

type ColorName =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'mint'
  | 'blue'
  | 'ultramarine'
  | 'purple'
  | 'pink'
  | 'gray';
type ColorBrightness = 'lightest' | 'lighter' | 'light' | 'normal' | 'dark' | 'darker' | 'darkest';
type ColorGradient = { [brightness in ColorBrightness]: ColorHex };
export type ColorSystem = Partial<{ [color in ColorName]: ColorGradient }>;
type ColorHex = string;
export const COLOR_UNKNOWN = '#149858';

// https://gist.github.com/EvAlex/ad0e43f4087e2e813a8f4cd872b433b8
export const RGB_COLOR_REGEX = /\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d*.\d*))?\)/;
export class Color {
  public r: number = 0;
  public g: number = 0;
  public b: number = 0;
  public a: number = 1;

  constructor();
  constructor(colorStr?: string);
  constructor(r?: string | number, g?: number, b?: number);
  constructor(r?: string | number, g?: number, b?: number, a?: number);
  constructor(r?: string | number, g?: number, b?: number, a?: number) {
    if (typeof r === 'string') {
      // tslint:disable-next-line: no-parameter-reassignment
      r = r.trim();
      if (r.indexOf('#') === 0) {
        // tslint:disable-next-line: no-parameter-reassignment
        r = r.substr(1);
        this.r = parseInt(r.substr(0, 2), 16);
        this.g = parseInt(r.substr(2, 2), 16);
        this.b = parseInt(r.substr(4, 2), 16);
      } else if (r.indexOf('rgb') === 0) {
        const res = RGB_COLOR_REGEX.exec(r);
        if (!res) return;
        this.r = parseInt(res[1], 10);
        this.g = parseInt(res[2], 10);
        this.b = parseInt(res[3], 10);
        this.a = res[5] ? parseFloat(res[5]) : 1;
      }
    } else {
      this.r = r || 0;
      this.g = g || 0;
      this.b = b || 0;
      this.a = a || 1;
    }
  }
  toHex() {
    return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}`;
  }
  toRgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
  toRgba() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  // my modifications
  toHexWithA() {
    return `#${this.r.toString(16)}${this.g.toString(16)}${this.b.toString(16)}${Math.floor(
      this.a * 255,
    ).toString(16)}`;
  }
  changeR(r: number) {
    this.r = r;
    return this;
  }
  changeG(g: number) {
    this.g = g;
    return this;
  }
  changeB(b: number) {
    this.b = b;
    return this;
  }
  changeA(a: number) {
    this.a = a;
    return this;
  }
  changeARel(p: number) {
    this.a = Math.min(1, this.a * p);
    return this;
  }
  withR(r: number) {
    return new Color(r, this.g, this.b, this.a);
  }
  withG(g: number) {
    return new Color(this.r, g, this.b, this.a);
  }
  withB(b: number) {
    return new Color(this.r, this.g, b, this.a);
  }
  withA(a: number) {
    return new Color(this.r, this.g, this.b, a);
  }
  withARel(p: number) {
    return new Color(this.r, this.g, this.b, Math.min(1, this.a * p));
  }
}
