import { DocumentNode, print } from "graphql/language";

import path from "path";

import Computed from "../api/Computed";
import * as OptionOutput from "../api/OptionOutput";

import writeFiles from "./writeFiles";

async function outputTS(
    output: OptionOutput.OptionOutput,
    executableDocumentNodeDict: Computed
): Promise<void> {
    if (output === OptionOutput.OUTPUT_STDOUT) {
        printout(executableDocumentNodeDict);
        return Promise.resolve();
    } else {
        const outputFiles = Array.from(executableDocumentNodeDict.keys()).map(
            distpath => {
                const dn = executableDocumentNodeDict.get(distpath);
                if (!dn) {
                    throw new Error(
                        `Not found value from dict by key: ${distpath} .`
                    );
                }
                const out = createTSOutput(distpath, dn);
                return {
                    distpath,
                    output: out
                };
            }
        );
        return writeFiles(outputFiles);
    }
}

function printout(computed: Computed): void {
    Array.from(computed.keys()).forEach(distpath => {
        const dn = computed.get(distpath);
        if (!dn) {
            throw new Error(`Not found value from dict by key: ${distpath} .`);
        }
        const output = createTSOutput(distpath, dn);
        /* tslint:disable no-console */
        console.log(
            "----------------------------------------------------------------------"
        );
        console.log(`dist: ${distpath}\n`);
        console.log(output);
        /* tslint:enable no-console */
    });
}

function createTSOutput(distpath: string, dn: DocumentNode): string {
    const operationName = path.basename(distpath, path.extname(distpath));
    const gql = print(dn);
    const output = `export const ${operationName} = \`
${gql}
\`;
`;
    return output;
}

export default outputTS;
