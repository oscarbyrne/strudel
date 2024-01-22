import { register, _mod } from '@strudel/core';

export const midify = register('midify', (channel, pattern) => pattern.midichan(channel).midi('UM-ONE MIDI 1'));
export const base = register('base', (radix, pattern) => pattern.withValue((v) => parseInt(v, radix)));
export const customScale = register('customScale', (chroma, pattern) => {
  const tonic = chroma[0];
  const monotonic = chroma.map((pc) => tonic + _mod(pc + 12 - tonic, 12));
  return pattern.fmap((n) => monotonic[_mod(n, monotonic.length)] + Math.floor(n / monotonic.length) * 12);
});
export const Vector = {
  add: (a, b) => a.map((e, i) => e + b[i]),
  magnitude: (v) => Math.sqrt(v.reduce((partialSum, e) => partialSum + e ** 2, 0)),
};
