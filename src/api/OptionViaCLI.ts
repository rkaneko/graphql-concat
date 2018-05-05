import { OptionLang } from "./OptionLang";
import { OptionOutput } from "./OptionOutput";

export default interface ConcatOption {
    readonly includes: ReadonlyArray<string>;
    readonly excludes: ReadonlyArray<string>;
    readonly dist: string;
    readonly output: OptionOutput;
    readonly lang: OptionLang;
    readonly schema?: string;
    readonly project?: string;
    readonly help: boolean;
}
