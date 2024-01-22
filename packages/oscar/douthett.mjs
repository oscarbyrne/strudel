import { listRange, _mod } from '@strudel/core';
import { Vector } from './util.mjs';

export function J(d, m, k) {
  if (d.length < 2 || m.length < 1) {
    return k;
  }
  k = J(d.slice(1), m.slice(1), k);
  return Math.floor((k * d[0] + m[0]) / d[1]);
}
export function D(d, m0, beacon, dm, contextual = true) {
  if (Vector.magnitude(dm) == 0) {
    return m0;
  }
  const nonT0 = (m) => beacon.every((k) => J(d, m0, k) == J(d, m, k));
  let mn = m0;
  do {
    mn = Vector.add(mn, dm);
  } while (contextual && nonT0(mn));
  return mn;
}
export class K {
  constructor(d, m0) {
    this.d = d;
    this.m0 = m0;
    this.m = m0;
  }
  set m(m) {
    console.log('New m: ' + m);
    this._m = m;
  }
  get m() {
    return this._m;
  }
  get beacon() {
    return listRange(0, this.d.at(-1) - 1);
  }
  get notes() {
    return this.beacon.map((k) => J(this.d, this.m, k));
  }
  get pcs() {
    return this.notes.map((k) => _mod(k, 12));
  }
  reset() {
    this.m = this.m0;
  }
  displace(dm) {
    this.m = D(this.d, this.m, this.beacon, dm);
  }
}
