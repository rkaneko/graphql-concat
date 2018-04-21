import { DocumentNode } from "graphql/language";

function containsOperationDefinition(documentNode: DocumentNode): boolean {
    for (const definition of documentNode.definitions) {
        if (definition.kind === "OperationDefinition") {
            return true;
        }
    }
    return false;
}

export default containsOperationDefinition;
