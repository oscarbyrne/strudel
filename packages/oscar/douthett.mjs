import { listRange, register } from '@strudel/core';

export class FiPS {
  #m;
  #d;

  constructor(d, m, octaveInterval = 12) {
    this.d = d;
    this.m = m;
    this.octaveInterval = octaveInterval;
  }
  #validate() {
    if (this.d.length != this.m.length + 1) {
      throw new Error('Expect d.length == m.length + 1');
    }
    if (!this.d.every((e, i, a) => !i || a[i - 1] >= e)) {
      throw new Error('d should be descending');
    }
    if (!this.d.every((e, i, a) => [0, -1].map((o) => o + a.lastIndexOf(e)).includes(a.indexOf(e)))) {
      throw new Error('Filters of the same order cannot be repeated more than once');
    }
    if (!this.d.every((e) => e > 0)) {
      throw new Error('All d should be > 0');
    }
    if (!this.d.every((e) => Number.isInteger(e))) {
      throw new Error('All d should be integer values');
    }
    if (this.d[0] > this.octaveInterval) {
      throw new Error('Maximum value of d cannot be larger than octave interval');
    }
  }
  get d() {
    return this.#d;
  }
  set d(d) {
    this.#d = d;
    this.#validate();
  }
  get m() {
    return this.#m || new Array(this.d.length - 1).fill(0);
  }
  set m(m) {
    this.#m = m;
    this.#validate();
  }
  J(k) {
    if (this.d.length < 2 || this.m.length < 1) {
      return k;
    }
    k = new FiPS(this.d.slice(1), this.m.slice(1), this.octaveInterval).J(k);
    return Math.floor((k * this.d[0] + this.m[0]) / this.d[1]);
  }
  isEqual(that) {
    if (!(that instanceof FiPS)) {
      return false;
    }
    if (this.d.at(-1) != that.d.at(-1)) {
      return false;
    }
    return listRange(0, this.d.at(-1) - 1).every((k) => this.J(k) == that.J(k));
  }
  #contiguous(rotation, filterNumber) {
    if (rotation != Math.sign(rotation)) {
      throw new Error('The values of mn in d* are restricted to {-1, 0, 1}');
    }
    if (rotation == 0) {
      return this.m[filterNumber];
    }
    let that = new FiPS([...this.d], [...this.m], this.octaveInterval);
    while (this.isEqual(that)) {
      that.m[filterNumber] += rotation;
    }
    return that.m[filterNumber];
  }
  displace(m) {
    return new FiPS([...this.d], m.map(this.#contiguous, this), this.octaveInterval);
  }
  chain(displacements, repetitions = 1) {
    let chords = [this];
    for (var i = 0; i < repetitions; i++) {
      for (const m of displacements) {
        chords.push(chords.at(-1).displace(m));
      }
    }
    return chords;
  }
  get outer() {
    if (this.d.length == 2) {
      return new FiPS([this.octaveInterval, ...this.d], [0, ...this.m], this.octaveInterval).outer;
    }
    const mn = this.m.at(-2) + this.d.at(-3) * Math.floor(this.m.at(-1) / this.d.at(-1));
    return new FiPS(this.d.slice(0, -1), [...this.m.slice(0, -2), mn], this.octaveInterval);
  }
  get normalized() {
    return new FiPS(
      [...this.d],
      this.m.map((mn, n) => mn % this.d[n]),
      this.octaveInterval,
    );
  }
}

register('chord', (fips, octave, pattern) => pattern.fmap((k) => fips.normalized.J(k)).note().add(fips.octaveInterval * octave));
