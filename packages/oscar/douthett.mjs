import { listRange } from '@strudel.cycles/core';
import { vectorAdd } from './util.mjs';

export function J(c, d, m) {
  return (...k) => k.map((ki) => Math.floor((ki * c + m) / d))
}
export class FiPS {
  constructor(...c) {
    this.c = c;
    this._m = new Array(c.length - 1).fill(0);
  }
  set m(m) {
    console.log('New m: ' + m);
    if (!Array.isArray(m) || m.length != this.c.length -1) {
      throw new Error('Not a valid m: ' + m);
    }
    this._m = m;
  }
  get m() {
    return this._m;
  }
  J(beacon = null) {
    let k = beacon || listRange(0, this.c[0] - 1);
    for (var n = 0; n < this.c.length - 1; n++) {
      k = J(this.c[n + 1], this.c[n], this.m[n])(...k);
    }
    return k;
  }
  d(...dm) {
    this.m = vectorAdd(this.m, dm);
  }
  dd(...dm) {
    const j = this.J();
    while (this.J().every((k, n) => k == j[n])) {
      this.d(...dm);
    }
  }
}
