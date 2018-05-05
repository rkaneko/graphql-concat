import { buildClientSchema, DocumentNode, print } from "graphql";

import Computed from "./Computed";
import concatDefinitionNodesToExecutableDocumentNode from "./concatDefinitionNodesToExecutableDocumentNode";
import ConcatOption from "./ConcatOption";
import preprocess from "./preprocess";
import validateDocumentNode from "./validateDocumentNode";

import isFile from "../util/fs/isFile";

export default async function compute(
    projectRootDir: string,
    option: ConcatOption
): Promise<Computed> {
    const preprocessed = await preprocess(projectRootDir, option);
    const computed = Array.from(
        preprocessed.inexecutableDocumentNodeDict.keys()
    ).reduce<Computed>((dict, distpath) => {
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
    if (!option.schema) {
        return await computed;
    }
    if (!isFile(option.schema)) {
        throw new Error(`Not found schema.json in :${option.schema} .`);
    }
    const schemaJson = require(option.schema);
    if (!schemaJson.data && !schemaJson.__schema) {
        throw new Error(
            `A valid GraphQL introspection query result should be contained in : ${
                option.schema
            } .`
        );
    }
    const schema = buildClientSchema(schemaJson.data)
        ? schemaJson.data
        : schemaJson;
    for (const documentNode of computed.values()) {
        validateDocumentNode(schema, documentNode);
    }
    return await computed;
}
