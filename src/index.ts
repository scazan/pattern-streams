/*
 * Basic collectiong of Patterns using generators
 */

export const Pattern = (pattern) => [() => pattern.next().value];

export { default as Pseq } from './Pseq';
export { default as Prand } from './Prand';
export { default as Pmarkov } from './Pmarkov';
export { default as Pgenetic } from './Pgenetic';
