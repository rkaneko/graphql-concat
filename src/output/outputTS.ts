import { DocumentNode, print } from "graphql/language";

import path from "path";

import ConcatContext from "../ConcatContext";
import { ExecutableDocumentNodeDict } from "../compute";
import { Preprocessed } from "../preprocess";

import writeFiles from "./writeFiles";

async function outputTS(
    ctx: ConcatContext,
    executableDocumentNodeDict: ExecutableDocumentNodeDict
): Promise<void> {
    if (ctx.output === "stdout") {
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
                const output = createTSOutput(distpath, dn);
                return {
                    distpath,
                    output
                };
            }
        );
        return writeFiles(outputFiles);
    }
}

function printout(dict: ExecutableDocumentNodeDict): void {
    Array.from(dict.keys()).forEach(distpath => {
        const dn = dict.get(distpath);
        if (!dn) {
            throw new Error(`Not found value from dict by key: ${distpath} .`);
        }
        const output = createTSOutput(distpath, dn);
        console.log(
            "----------------------------------------------------------------------"
        );
        console.log(`dist: ${distpath}\n`);
        console.log(output);
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
