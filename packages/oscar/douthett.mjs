import { listRange } from '@strudel.cycles/core';
import { vectorAdd } from './util.mjs';

export function J(c, d, m) {
  return (...k) => k.map((ki) => Math.floor((ki * c + m) / d))
}
export class FiPS {
  constructor(c) {
    this.c = c;
  }
  k(m) {
    return new K(this, m);
  }
  j(m) {
    let k = listRange(0, this.c[0] - 1);
    for (var n = 0; n < this.c.length - 1; n++) {
      k = J(this.c[n + 1], this.c[n], this.m[n])(...k);
    }
    return k;
  }
}
export class K {
  constructor(fips, m) {
    this.fips = fips;
    this.m = m;
  }
  get pcs() {
    return this.fips.j(this.m);
  }
}
export class D {
  constructor(fips, dm) {
    this.fips = fips;
    this.dm = dm;
  }
  apply(k, contextual=true) {
    let m = k.m;
    do {
      m += this.dm;
    } while (!contextual || k.pcs == this.fips.k(m).pcs);
    return new K(this.fips, m);
  }
}
