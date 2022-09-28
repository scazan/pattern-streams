/*
 * Basic collection of Patterns using generators
 */

export const Pattern = (pattern: any) => [() => pattern.next().value];

export { default as Pseq } from './patterns/Pseq';
export { default as Prand } from './patterns/Prand';
export { default as Pchoose } from './patterns/Pchoose';
export { default as Pmarkov } from './patterns/Pmarkov';
export { default as Pgenetic } from './patterns/Pgenetic';
export { default as utils } from './utils';
// export { default as TempoClock } from 'TempoClock';

// export type Pattern = typeof Pseq | typeof Prand | typeof Pchoose | typeof Pmarkov | typeof Pgenetic;
