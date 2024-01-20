import { register } from '@strudel.cycles/core';

export const midify = register('midify', function (channel, pattern) {
  return pattern.midichan(channel).midi('UM-ONE MIDI 1');
});

export const vectorAdd = (a, b) => a.map((e, i) => e + b[i]);
