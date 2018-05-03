import path from "path";

import OptionViaConfig from "../api/OptionViaConfig";
import isFile from "../util/fs/isFile";

function loadConfig(
    pathToConfig: string,
    projectRootDir: string,
    projectName?: string
): OptionViaConfig | null {
    if (!isFile(pathToConfig)) {
        const dirname = path.dirname(pathToConfig);
        // console.log(`Not found .graphqlconfig in :${dirname} .`);
        return null;
    }
    try {
        require("graphql-config");
    } catch (error) {
        // console.log("User doesn't install graphql-config module.");
        return null;
    }

    const { getGraphQLProjectConfig } = require("graphql-config");

    const graphQLProjectConfig = projectName
        ? getGraphQLProjectConfig(pathToConfig, projectName)
        : getGraphQLProjectConfig(pathToConfig);
    const includes =
        (graphQLProjectConfig.config.includes as ReadonlyArray<string>).map(i =>
            path.join(projectRootDir, i)
        ) || ([] as string[]);
    const excludes =
        (graphQLProjectConfig.config.excludes as ReadonlyArray<string>).map(e =>
            path.join(projectRootDir, e)
        ) || ([] as string[]);
    const schema = path.join(
        projectRootDir,
        graphQLProjectConfig.config.schemaPath
    );
    return {
        includes,
        excludes,
        schema
    };
}

export default loadConfig;
