import { listRange } from '@strudel/core';
import { OrderedPcSet } from './tonal.mjs';
import { vectorAdd } from './util.mjs';

export function J(c, d, m) {
  return (k) => Math.floor((k * c + m) / d);
}
export function FiPS(c) {
  return (m) => {
    let k = listRange(0, c[0] - 1);
    for (var n = 0; n < c.length - 1; n++) {
      k = k.map(J(c[n + 1], c[n], m[n]));
    }
    return k;
  }
}
export function D(fips, dm, contextual=true) {
  return (m) => {
    let mm = m;
    do {
      mm = vectorAdd(mm, dm);
    } while (contextual && OrderedPcSet.isEqual(fips(mm), fips(m)));
    return mm;
  }
}
export class K {
  constructor(filters, initialM) {
    this.fips = new FiPS(filters);
    this.initialM = initialM;
    this.m = initialM;
  }
  set m(m) {
    console.log('New coords: ' + m);
    this._m = m;
  }
  get m() {
    return this._m;
  }
  notes() {
    return this.fips(this.m);
  }
  reset() {
    this.m = this.initialM;
  }
  displace(dm) {
    this.m = D(this.fips, dm)(this.m);
  }
}
