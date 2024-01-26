import { register, _mod } from '@strudel/core';

export const midify = register('midify', (channel, pattern) => pattern.midichan(channel).midi('UM-ONE MIDI 1'));
export const Vector = {
  add: (a, b) => a.map((e, i) => e + b.at(i)),
  magnitude: (a) => Math.sqrt(a.reduce((partialSum, e) => partialSum + e ** 2, 0)),
};
