import test from "ava";

import path from "path";

import readFileAsync from "./util/fs/readFileAsync";
import sourceToDocumentNode from "./util/graphql/sourceToDocumentNode";

import createFragmentDefinitionDict from "./createFragmentDefinitionDict";

test("Should be created FragmentDefinitionDict from definitions.", async t => {
    const pathToGraphQL = path.join(
        __dirname,
        "..",
        "graphql",
        "fragment",
        "CommitEntryTree.graphql"
    );
    const graphql = await readFileAsync(pathToGraphQL, { encoding: "utf-8" });
    const documentNode = sourceToDocumentNode(graphql);

    const actual = createFragmentDefinitionDict(documentNode.definitions);

    const key = "CommitEntryTree";
    t.true(actual.has(key));
    const fragmentDefinition = actual.get(key);
    if (fragmentDefinition) {
        t.is(fragmentDefinition.kind, "FragmentDefinition");
    }
});
