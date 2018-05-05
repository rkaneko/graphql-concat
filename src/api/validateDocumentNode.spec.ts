import test from "ava";
import { buildClientSchema, DocumentNode } from "graphql";
import path from "path";
import readFileAsync from "../util/fs/readFileAsync";
import sourceToDocumentNode from "../util/graphql/sourceToDocumentNode";

import validateDocumentNode from "./validateDocumentNode";

// tslint:disable-next-line no-var-requires
const schemaJson = require("../../graphql/schema.json");
const schema = buildClientSchema(schemaJson.data);

const READ_GQL_OPTION = { encoding: "utf-8" };

function graphqlToDocumentNode(pathToGraphQL: string): Promise<DocumentNode> {
    return readFileAsync(pathToGraphQL, READ_GQL_OPTION).then(gql =>
        sourceToDocumentNode(gql)
    );
}

test("Should not throw an error when a document node is valid for schema.json.", async t => {
    const pathToGraphQL = path.join(
        process.cwd(),
        "graphql",
        "dist",
        "graphql",
        "GetEntryCommit.graphql"
    );
    const documentNode = await graphqlToDocumentNode(pathToGraphQL);

    validateDocumentNode(schema, documentNode);
    t.pass();
});

test("Should throw an error when a document node is invalid for schema.json.", async t => {
    const pathToGraphQL = path.join(
        process.cwd(),
        "graphql",
        "invalid",
        "InvalidGetEntryCommit.graphql"
    );
    const documentNode = await graphqlToDocumentNode(pathToGraphQL);

    const error = t.throws(() => {
        validateDocumentNode(schema, documentNode);
    }, Error);
    t.is(error.message, "DocumentNode is invalid for schema.json.");
});
