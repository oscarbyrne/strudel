import { register } from '@strudel.cycles/core';

function monotonize(pcs) {
  pcs = pcs.map((p) => p % 12);
  for (let i = 1; i < pcs.length; i++) {
    if (pcs[i] < pcs[i - 1]) {
      pcs[i] += 12;
    }
  }
  return pcs;
}
export const customScale = register('customScale', function (list, pattern) {
  list = monotonize(list);
  return pattern.fmap((value) => list.at(value % list.length) + Math.floor(value / list.length) * 12);
});
export const base = register('base', (radix, pattern) => pattern.withValue((v) => parseInt(v, radix)));
