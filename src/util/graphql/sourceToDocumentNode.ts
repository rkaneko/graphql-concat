import { DocumentNode, parse, ParseOptions, Source } from "graphql/language";

function sourceToDocumentNode(
    source: string | Source,
    options?: ParseOptions
): DocumentNode {
    const src = typeof source === "string" ? new Source(source) : source;
    const opts = options || { noLocation: true };
    return parse(src, opts);
}

export default sourceToDocumentNode;
