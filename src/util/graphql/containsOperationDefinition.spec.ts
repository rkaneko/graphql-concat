import test from "ava";

import sourceToDocumentNode from "./sourceToDocumentNode";

import containsOperationDefinition from "./containsOperationDefinition";


test("DocumentNode should contain OperationDefinition.", t => {
    const source1 = `
query SomeQuery {
  blah(input: { id: 1 }) {
    firstName
    lastName
    nested {
       ... NestedFragment
    }
  }
}
`;
    const source2 = `
mutation SomeMutaton($name: string) {
  blah(name: $name) {
    firstName
    lastName
    nested {
      ... NestedFragment
    }
  }
}
`;
    [source1, source2].forEach((source, index) => {
        const actual = containsOperationDefinition(
            sourceToDocumentNode(source)
        );
        t.true(actual, `source[${index}] failed to assert.`);
    });

});

test("DocumentNode should not contain OperationDefinition.", t => {
    const source1 = `
fragment SomeFragment on BlahBlah {
  firstName
  nested {
    ... SomeNestedFragment
  }
}
`;
    [source1].forEach(source => {
        const actual = containsOperationDefinition(
            sourceToDocumentNode(source)
        );
        t.false(actual);
    });
});
