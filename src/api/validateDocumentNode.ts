import {
    DocumentNode,
    GraphQLError,
    GraphQLSchema,
    specifiedRules,
    validate,
    ValidationContext
} from "graphql";

export default function validateDocumentNode(
    schema: GraphQLSchema,
    documentNode: DocumentNode
): void {
    const validationErrors = validate(schema, documentNode, specifiedRules);
    if (validationErrors && validationErrors.length > 0) {
        for (const error of validationErrors) {
            // tslint:disable-next-line no-console
            console.error(error);
        }
        throw new Error(`DocumentNode is invalid for schema.json.`);
    }
}
