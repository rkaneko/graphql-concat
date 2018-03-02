import {
    GraphQLProjectConfig,
    getGraphQLProjectConfig
} from "graphql-config";

function loadConfig(pathToConfig: string, projectName?: string): GraphQLProjectConfig {
    if (projectName) {
        return getGraphQLProjectConfig(pathToConfig, projectName);
    }
    return getGraphQLProjectConfig(pathToConfig);
}

export default loadConfig;
