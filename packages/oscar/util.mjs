import { register } from '@strudel/core';

export const midify = register('midify', (channel, pattern) => pattern.midichan(channel).midi('UM-ONE MIDI 1'));
export const base = register('base', (radix, pattern) => pattern.withValue((v) => parseInt(v, radix)));
export const vectorAdd = (a, b) => a.map((e, i) => e + b[i]);
