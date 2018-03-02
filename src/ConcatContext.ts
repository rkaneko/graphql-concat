import {
    GraphQLProjectConfig
} from "graphql-config";

import {
    OutputFormat,
    OutputLanguage
} from "./cli/CommandOptions";


interface ConcatContext {
    readonly config: GraphQLProjectConfig;
    readonly projectRootDir: string;
    readonly distDir: string;
    readonly output: OutputFormat;
    readonly lang: OutputLanguage;
}

export default ConcatContext;
