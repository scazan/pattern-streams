/*
 * Basic collection of Patterns using generators
 */

export const Pattern = (pattern: any) => [() => pattern.next().value];

export { default as Pseq } from './Pseq';
export { default as Prand } from './Prand';
export { default as Pchoose } from './Pchoose';
export { default as Pmarkov } from './Pmarkov';
export { default as Pgenetic } from './Pgenetic';
export { default as utils } from './utils';
