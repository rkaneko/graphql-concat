import {
    DocumentNode,
    FragmentDefinitionNode,
    FragmentSpreadNode,
    OperationDefinitionNode,
    SelectionSetNode
} from "graphql/language";

import findFragmentSpreadNodesFromSelectionSet from "./findFragmentSpreadNodesFromSelectionSet";

function findAllFragmentSpreadNodes(
    documentNode: DocumentNode
): FragmentSpreadNode[] {
    return documentNode.definitions.reduce<FragmentSpreadNode[]>((fsns, dn) => {
        if (dn.kind === "OperationDefinition") {
            const operationDefinitionNode = dn as OperationDefinitionNode;
            return fsns.concat(
                findFragmentSpreadNodesFromSelectionSet(
                    operationDefinitionNode.selectionSet
                )
            );
        } else if (dn.kind === "FragmentDefinition") {
            const fragmentDefinitionNode = dn as FragmentDefinitionNode;
            return fsns.concat(
                findFragmentSpreadNodesFromSelectionSet(
                    fragmentDefinitionNode.selectionSet
                )
            );
        }
        return fsns;
    }, []);
}

export default findAllFragmentSpreadNodes;
