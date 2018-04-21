import { print } from "graphql/language";

import { ExecutableDocumentNodeDict } from "../compute";
import ConcatContext from "../ConcatContext";
import { Preprocessed } from "../preprocess";

import writeFiles from "./writeFiles";

async function outputGQL(
    ctx: ConcatContext,
    executableDocumentNodeDict: ExecutableDocumentNodeDict
): Promise<void> {
    if (ctx.output === "stdout") {
        printout(executableDocumentNodeDict);
        return Promise.resolve();
    } else {
        const outputFiles = Array.from(executableDocumentNodeDict.keys()).map(
            distpath => {
                const gql = print(executableDocumentNodeDict.get(distpath));
                return {
                    distpath,
                    output: gql
                };
            }
        );
        return writeFiles(outputFiles);
    }
}

function printout(dict: ExecutableDocumentNodeDict): void {
    Array.from(dict.keys()).forEach(distpath => {
        /* tslint:disable no-console */
        console.log(
            "----------------------------------------------------------------------"
        );
        console.log(`dist: ${distpath}\n`);
        console.log(print(dict.get(distpath)));
        /* tslint:enable no-console */
    });
}

export default outputGQL;
