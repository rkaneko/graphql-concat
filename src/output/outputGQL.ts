import { print } from "graphql/language";

import Computed from "../api/Computed";
import * as OptionOutput from "../api/OptionOutput";

import writeFiles from "./writeFiles";

async function outputGQL(
    output: OptionOutput.OptionOutput,
    executableDocumentNodeDict: Computed
): Promise<void> {
    if (output === OptionOutput.OUTPUT_STDOUT) {
        printout(executableDocumentNodeDict);
        return Promise.resolve();
    } else {
        const outputFiles = Array.from(
            executableDocumentNodeDict.entries()
        ).map(([distpath, dn]) => {
            const gql = print(dn);
            return {
                distpath,
                output: gql
            };
        });
        return writeFiles(outputFiles);
    }
}

function printout(computed: Computed): void {
    Array.from(computed.entries()).forEach(([distpath, dn]) => {
        /* tslint:disable no-console */
        console.log(
            "----------------------------------------------------------------------"
        );
        console.log(`dist: ${distpath}\n`);
        console.log(print(dn));
        /* tslint:enable no-console */
    });
}

export default outputGQL;
