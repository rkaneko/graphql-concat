import {
    FragmentDefinitionNode
} from "graphql/language";

export type FragmentDefinitionDict = Map<string, FragmentDefinitionNode>;

type FragmentDefinitionDictEntry = [string, FragmentDefinitionNode];

export function merge(
    dict1: FragmentDefinitionDict,
    dict2: FragmentDefinitionDict
): FragmentDefinitionDict {
    const cloned = new Map<string, FragmentDefinitionNode>(
        Array.from(dict1.entries())
    );

    Array.from(dict2.entries()).forEach((entry: FragmentDefinitionDictEntry) => {
        const [name, fdn] = entry;
        if (cloned.has(name)) {
            throw new Error(`FragmentDefinitionNode's name: ${name} is duplicated.
                This is not supported on graphql-concat.`
            );
        }
        cloned.set(name, fdn);
    });
    return cloned;
}
