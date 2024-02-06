import { register } from '@strudel/core';

const DEVICE = 'UM-ONE MIDI 1';

export const midify = register('midify', (channel, pattern) => pattern.midichan(channel).midi(DEVICE));
