import Computed from "../api/Computed";
import * as OptionLang from "../api/OptionLang";
import * as OptionOutput from "../api/OptionOutput";

import outputGQL from "./outputGQL";
import outputTS from "./outputTS";

export default function run(
    executableDocumentNodeDict: Computed,
    output: OptionOutput.OptionOutput,
    lang: OptionLang.OptionLang
): Promise<void> {
    if (lang === OptionLang.LANG_GQL) {
        return outputGQL(output, executableDocumentNodeDict);
    } else if (lang === OptionLang.LANG_TS) {
        return outputTS(output, executableDocumentNodeDict);
    } else {
        throw new Error("Unsupported yet.");
    }
}
