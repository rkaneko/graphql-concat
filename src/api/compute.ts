import { DocumentNode, print } from "graphql/language";

import Computed from "./Computed";
import concatDefinitionNodesToExecutableDocumentNode from "./concatDefinitionNodesToExecutableDocumentNode";
import ConcatOption from "./ConcatOption";
import preprocess from "./preprocess";

export default async function compute(
    projectRootDir: string,
    option: ConcatOption
): Promise<Computed> {
    const preprocessed = await preprocess(projectRootDir, option);
    return Array.from(preprocessed.inexecutableDocumentNodeDict.keys()).reduce<
        Computed
    >((dict, distpath) => {
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
}
