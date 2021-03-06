import { DocumentNode, FragmentDefinitionNode } from "graphql/language";

import ConcatOption from "./ConcatOption";
import createDistPath from "./createDistPath";
import createFragmentDefinitionDict from "./createFragmentDefinitionDict";
import findGraphQL from "./findGraphQL";
import { FragmentDefinitionDict, merge } from "./FragmentDefinitionDict";

import readFileAsync from "../util/fs/readFileAsync";
import containsOperationDefinition from "../util/graphql/containsOperationDefinition";
import sourceToDocumentNode from "../util/graphql/sourceToDocumentNode";

const FILE_READ_OPTS = { encoding: "utf-8" };

type InexecutableDocumentNodeDict = Map<string, DocumentNode>;

export interface Preprocessed {
    readonly fragmentDefinitionDict: FragmentDefinitionDict;
    readonly inexecutableDocumentNodeDict: InexecutableDocumentNodeDict;
}

async function preprocess(
    projectRootDir: string,
    option: ConcatOption
): Promise<Preprocessed> {
    const fullpaths = findGraphQL(
        projectRootDir,
        option.includes,
        option.excludes
    );
    const inexecutableDocumentNodeDict = new Map<string, DocumentNode>();

    let fddict = new Map<string, FragmentDefinitionNode>();
    for (const fullpath of fullpaths) {
        const gql = await readFileAsync(fullpath, FILE_READ_OPTS);
        const dn = sourceToDocumentNode(gql);

        const dict = createFragmentDefinitionDict(dn.definitions);
        fddict = fddict ? merge(dict, fddict) : dict;

        if (containsOperationDefinition(dn)) {
            const distpath = createDistPath(
                projectRootDir,
                option.lang,
                option.dist,
                fullpath
            );
            inexecutableDocumentNodeDict.set(distpath, dn);
        }
    }
    return {
        fragmentDefinitionDict: fddict,
        inexecutableDocumentNodeDict
    };
}

export default preprocess;
