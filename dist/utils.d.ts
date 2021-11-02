export declare const mtof: (note: number) => number;
export declare const ftom: (note: number) => number;
export declare const choose: (array: Array<any>) => any;
export declare const getRateFromFrequencies: (freq: number, baseFreq: number) => number;
export declare const getClosestMember: (subject: any, set: any[]) => any;
export declare const findInCollection: (collection: any[], predicateFunction: Function) => any;
export declare const mapToDomain: (set: number[], domain: number[]) => any[];
export declare const flipCoin: (probability?: number) => boolean;
export declare const makeFunction: (value: any) => Function;
export declare const windex: (weights: number[]) => number;
export declare const normalize: (coll: number[]) => number[];
export declare const isEquivalent: (a: object | any, b: object | any) => boolean;
export declare const mod: (num: number, modulo: number) => number;
export declare const getSequentialRandomIndex: (lastIndex: number, length: number) => number;
declare const _default: {
    mtof: (note: number) => number;
    ftom: (note: number) => number;
    choose: (array: any[]) => any;
    getRateFromFrequencies: (freq: number, baseFreq: number) => number;
    getClosestMember: (subject: any, set: any[]) => any;
    findInCollection: (collection: any[], predicateFunction: Function) => any;
    mapToDomain: (set: number[], domain: number[]) => any[];
    flipCoin: (probability?: number) => boolean;
    makeFunction: (value: any) => Function;
    windex: (weights: number[]) => number;
    normalize: (coll: number[]) => number[];
    isEquivalent: (a: any, b: any) => boolean;
    mod: (num: number, modulo: number) => number;
    getSequentialRandomIndex: (lastIndex: number, length: number) => number;
};
export default _default;
