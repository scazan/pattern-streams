interface IRules {
    [key: string]: string;
}
interface IOptions {
    axiom: string;
    rules: IRules;
    finals?: {
        [key: string]: () => any;
    };
    branchSymbols?: string;
    ignoredSymbols?: string;
}
export declare function Plsys(options: IOptions, repetitions?: number): Generator<string, void, unknown>;
declare const _default: (options: IOptions, repetitions?: number | undefined) => any;
export default _default;
