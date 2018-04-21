import { FragmentSpreadNode, SelectionNode } from "graphql/language";

function findFragmentSpreadNodes(
    selectionNode: SelectionNode
): FragmentSpreadNode[] {
    if (selectionNode.kind === "FragmentSpread") {
        return [selectionNode as FragmentSpreadNode];
    } else if (
        selectionNode.kind === "Field" ||
        selectionNode.kind === "InlineFragment"
    ) {
        if (!selectionNode.selectionSet) {
            return [] as FragmentSpreadNode[];
        }
        return selectionNode.selectionSet.selections.reduce<
            FragmentSpreadNode[]
        >(
            (fsns, selection) =>
                fsns.concat(findFragmentSpreadNodes(selection)),
            []
        );
    }
    throw new Error(`Unsupported SelectionNode: ${selectionNode}.`);
}

export default findFragmentSpreadNodes;
