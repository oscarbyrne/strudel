import { listRange } from '@strudel.cycles/core';
import { vectorAdd } from './util.mjs';

export function maximallyEvenSet(c, d, m) {
  return listRange(0, d - 1).map((k) => Math.floor((k * c + m) / d));
}
export class FiPS {
  constructor(...c) {
    this.c = c;
    this.m = new Array(c.length - 1).fill(0);
  }
  withM(...m) {
    let f = new FiPS(...this.c);
    f.m = m;
    return f;
  }
  j(pcs = listRange(0, 11)) {
    for (let n = 0; n < this.c.length - 1; n++) {
      pcs = pcs.map((k) => maximallyEvenSet(this.c[n + 1], this.c[n], this.m[n]).at(k % this.c[n]));
    }
    return pcs;
  }
  d(...dm) {
    this.m = vectorAdd(this.m, dm);
    console.log('New m: ' + this.m);
  }
  dd(...ds) {
    ds = ds.map(Math.sign);
    let edge = new Array(this.m.length);
    for (var n = 0; n < this.m.length; n++) {
      edge[n] = this.boundary(n, ds[n]);
    }
    this.d(...vectorAdd(edge, ds));
  }
  boundary(n, sign) {
    sign = Math.sign(sign);
    if (sign == 0) {
      return 0;
    }
    const j = this.j();
    let k = j;
    let d = 0;
    while (j.every((v, i) => v == k[i])) {
      d += sign;
      k = this.withM(...Object.assign([], this.m, { [n]: this.m[n] + d })).j();
    }
    return d - 1;
  }
}
