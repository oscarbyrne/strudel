import { register } from '@strudel/core';

export const midify = register('midify', (channel, pattern) => pattern.midichan(channel).midi('UM-ONE MIDI 1'));
