import { GraphQLProjectConfig, getGraphQLProjectConfig } from "graphql-config";
import path from "path";

import isFile from "./util/fs/isFile";

function loadConfig(
    pathToConfig: string,
    projectName?: string
): GraphQLProjectConfig {
    if (!isFile(pathToConfig)) {
        const dirname = path.dirname(pathToConfig);
        throw new Error(`Not found .graphqlconfig in :${dirname} .`);
    }
    if (projectName) {
        return getGraphQLProjectConfig(pathToConfig, projectName);
    }
    return getGraphQLProjectConfig(pathToConfig);
}

export default loadConfig;
