import test from "ava";

import path from "path";

import readFileAsync from "../fs/readFileAsync";
import sourceToDocumentNode from "./sourceToDocumentNode";

import findAllFragmentSpreadNodes from "./findAllFragmentSpreadNodes";

test("Can find FragmentSpreadNode from DocumentNode.", async t => {
    const pathToGraphQL = path.join(__dirname, "..", "..", "..", "graphql", "exec", "GetEntryCommit.graphql");
    const graphql = await readFileAsync(pathToGraphQL, { encoding: "utf-8" });
    const documentNode = sourceToDocumentNode(graphql);

    const actual = findAllFragmentSpreadNodes(documentNode);

    t.is(actual.length, 2);
    actual.forEach(fsn => {
        t.is(fsn.kind, "FragmentSpread");
    });
});
