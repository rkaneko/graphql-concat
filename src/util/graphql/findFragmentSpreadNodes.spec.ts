import test from "ava";

import {
    FragmentDefinitionNode,
    SelectionNode
} from "graphql/language";

import sourceToDocumentNode from "./sourceToDocumentNode";

import findFragmentSpreadNodes from "./findFragmentSpreadNodes";

const EXAMPLE_GQL = `
fragment ExampleFragment on BlahBlah {
  blahblah {
    firstName
    nested {
        ... NestedFragmentSpread1
    }
    ... FragmentSpread1
  }
}
`;

test("Can find FragmentSpreadNode recursively.", t => {
    const documentNode = sourceToDocumentNode(EXAMPLE_GQL);

    t.is(documentNode.definitions.length, 1);

    const fdn = documentNode.definitions[0] as FragmentDefinitionNode;

    t.is(fdn.selectionSet.selections.length, 1);

    const sn = fdn.selectionSet.selections[0] as SelectionNode;

    const actual = findFragmentSpreadNodes(sn);

    t.is(actual.length, 2);

    const names = actual.map(fsn => fsn.name.value);
    t.deepEqual(names, ["NestedFragmentSpread1", "FragmentSpread1"]);
});
