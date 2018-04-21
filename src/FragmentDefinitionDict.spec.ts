import test from "ava";

import { FragmentDefinitionNode } from "graphql/language";

import { FragmentDefinitionDict, merge } from "./FragmentDefinitionDict";

function fdOf(name: string): FragmentDefinitionNode {
    return {
        kind: "FragmentDefinition",
        name: {
            kind: "Name",
            value: name
        },
        typeCondition: {
            kind: "NamedType",
            name: {
                kind: "Name",
                value: "BlahblahType"
            }
        },
        selectionSet: {
            kind: "SelectionSet",
            selections: [
                {
                    kind: "Field",
                    name: {
                        kind: "Name",
                        value: "firstName"
                    }
                },
                {
                    kind: "FragmentSpread",
                    name: {
                        kind: "Name",
                        value: "BlahBlahSpread"
                    }
                }
            ]
        }
    };
}

function fdDictFrom(...names: string[]): FragmentDefinitionDict {
    return names.reduce<FragmentDefinitionDict>(
        (dict, name) => {
            const fd = fdOf(name);
            dict.set(name, fd);
            return dict;
        },
        new Map() as FragmentDefinitionDict
    );
}

test("Can merge two FragmentDefinitionDict.", t => {
    const names = ["Fragment1", "Fragment2", "Fragment3", "Fragment4"];
    const dict1 = fdDictFrom(...names.slice(0, 2));
    const dict2 = fdDictFrom(...names.slice(2, names.length));

    const actual = merge(dict1, dict2);

    const actualNames = Array.from(actual.keys()).sort((n1, n2) => {
        if (n1 === n2) {
            return 0;
        }
        return n1 < n2 ? -1 : 1;
    });
    t.deepEqual(actualNames, names);
});

test("An error should be thrown when FragmentDefinition name duplicated between two dicts.", t => {
    const names = ["Fragment1", "Fragment2", "Fragment1", "Fragment4"];
    const dict1 = fdDictFrom(...names.slice(0, 2));
    const dict2 = fdDictFrom(...names.slice(2, names.length));

    const error = t.throws(() => {
        merge(dict1, dict2);
    }, Error);
    t.true(error instanceof Error);
});
