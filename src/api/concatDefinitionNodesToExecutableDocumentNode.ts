import {
    DefinitionNode,
    DocumentNode,
    FragmentDefinitionNode,
    NameNode
} from "graphql/language/ast";

import findAllFragmentSpreadNodes from "../util/graphql/findAllFragmentSpreadNodes";
import { FragmentDefinitionDict } from "./FragmentDefinitionDict";

function concatDefinitionNodesToExecutableDocumentNode(
    documentNode: DocumentNode,
    dict: FragmentDefinitionDict
): DocumentNode {
    const fragmentSpreadNames = findAllFragmentSpreadNodes(documentNode).map(
        fsn => fsn.name.value
    );
    const fragmentDefinitionNodes = fragmentSpreadNames.reduce<
        FragmentDefinitionNode[]
    >((fdns, name) => {
        const fdn = dict.get(name);
        if (!fdn) {
            throw new Error(
                `Not found FragmentDefinitionNode by name: ${name}.`
            );
        }
        return [...fdns, fdn];
    }, []);
    const concatenatedDefinitions = fragmentDefinitionNodes.reduce<
        ReadonlyArray<DefinitionNode>
    >((dns, fdn) => {
        if (!containsFragmentDefinitionNode(dns, fdn.name)) {
            return [...dns, fdn];
        }
        return dns;
    }, ([] as ReadonlyArray<DefinitionNode>).concat(documentNode.definitions));
    const concatenatedDocumentNode = Object.assign({}, documentNode, {
        definitions: concatenatedDefinitions
    });
    if (
        documentNode.definitions.length ===
        concatenatedDocumentNode.definitions.length
    ) {
        return concatenatedDocumentNode;
    }
    let previous = documentNode;
    let next = concatenatedDocumentNode;
    while (previous.definitions.length < next.definitions.length) {
        previous = next || concatenatedDocumentNode;
        next = concatDefinitionNodesToExecutableDocumentNode(previous, dict);
    }
    return next;
}

function containsFragmentDefinitionNode(
    definitions: ReadonlyArray<DefinitionNode>,
    name: NameNode
): boolean {
    return definitions.reduce<boolean>((contains, dn) => {
        if (contains) {
            return contains;
        }
        if (dn.kind === "FragmentDefinition") {
            const fdn = dn as FragmentDefinitionNode;
            return name.value === fdn.name.value;
        }
        return contains;
    }, false);
}

export default concatDefinitionNodesToExecutableDocumentNode;
