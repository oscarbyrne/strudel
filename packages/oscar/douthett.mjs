import { listRange } from '@strudel.cycles/core'


export function maximallyEvenSet(c, d, m) {
  return listRange(0, d-1).map(
    (k) => Math.floor((k * c + m) / d)
  );
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
  j(pcs=listRange(0, 11)) {
    for (let n = 0; n < this.c.length - 1; n++) {
      pcs = pcs.map(
        (k) =>
        maximallyEvenSet(
          this.c[n + 1],
          this.c[n],
          this.m[n]
        ).at(k % this.c[n])
      );
    }
    return pcs;
  }
  d(...dm) {
    return this.withM(
      ...this.m.map(
        (mn, n) => mn + dm[n]
      )
    );
  }
  dd(...dm) {
    // TODO
  }
  upperBoundary(n) {
    // TODO
  }
  lowerBoundary(n) {
    // TODO
  }
}
