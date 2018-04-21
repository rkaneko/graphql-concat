import { SelectionSetNode, FragmentSpreadNode } from "graphql/language";

import findFragmentSpreadNodes from "./findFragmentSpreadNodes";

function findFragmentSpreadNodesFromSelectionSet(
    selectionSet: SelectionSetNode
): FragmentSpreadNode[] {
    return selectionSet.selections.reduce<FragmentSpreadNode[]>(
        (fsns, selection) => fsns.concat(findFragmentSpreadNodes(selection)),
        []
    );
}

export default findFragmentSpreadNodesFromSelectionSet;
