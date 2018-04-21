import { DefinitionNode, FragmentDefinitionNode } from "graphql/language/ast";

import { FragmentDefinitionDict } from "./FragmentDefinitionDict";

function createFragmentDefinitionDict(
    definitions: DefinitionNode[]
): FragmentDefinitionDict {
    if (definitions.length === 0) {
        return new Map() as FragmentDefinitionDict;
    }
    return definitions.reduce<FragmentDefinitionDict>((dict, definition) => {
        if (definition.kind === "FragmentDefinition") {
            const fragmentDefinition = definition as FragmentDefinitionNode;
            const { value } = fragmentDefinition.name;
            if (!value || typeof value !== "string") {
                throw new Error(
                    "FragmentDefinitionNode must have a name property."
                );
            }
            if (dict.has(value)) {
                throw new Error(`FragmentDefinitionNode's name: ${value} is duplicated.
                    This is not supported on graphql-concat.`);
            }
            dict.set(value, fragmentDefinition);
        }
        return dict;
    }, new Map());
}

export default createFragmentDefinitionDict;
