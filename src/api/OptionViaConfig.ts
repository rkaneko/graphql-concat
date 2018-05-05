export default interface OptionViaConfig {
    readonly includes: ReadonlyArray<string>;
    readonly excludes: ReadonlyArray<string>;
    readonly schema?: string;
}
