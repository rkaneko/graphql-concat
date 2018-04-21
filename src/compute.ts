import { DocumentNode, print } from "graphql/language";

import ConcatContext from "./ConcatContext";
import concatDefinitionNodesToExecutableDocumentNode from "./concatDefinitionNodesToExecutableDocumentNode";
import { Preprocessed } from "./preprocess";

import outputGQL from "./output/outputGQL";
import outputTS from "./output/outputTS";

export type ExecutableDocumentNodeDict = Map<string, DocumentNode>;

async function compute(
    ctx: ConcatContext,
    preprocessed: Preprocessed
): Promise<void> {
    const executableDocumentNodeDict = Array.from(
        preprocessed.inexecutableDocumentNodeDict.keys()
    ).reduce<ExecutableDocumentNodeDict>((dict, distpath) => {
        const inexecutableDocumentNode = preprocessed.inexecutableDocumentNodeDict.get(
            distpath
        );
        if (!inexecutableDocumentNode) {
            throw new Error(`Not found value from dict by key: ${distpath} .`);
        }
        const executableDocumentNode = concatDefinitionNodesToExecutableDocumentNode(
            inexecutableDocumentNode,
            preprocessed.fragmentDefinitionDict
        );
        dict.set(distpath, executableDocumentNode);
        return dict;
    }, new Map<string, DocumentNode>());
    if (ctx.lang === "gql") {
        return outputGQL(ctx, executableDocumentNodeDict);
    } else if (ctx.lang === "ts") {
        return outputTS(ctx, executableDocumentNodeDict);
    } else {
        console.log("Unsupported yet.");
        return Promise.resolve();
    }
}

export default compute;
