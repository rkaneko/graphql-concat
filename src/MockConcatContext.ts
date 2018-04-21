import { GraphQLProjectConfig } from "graphql-config";

const pathToProjectRoot = "/path/to/project";

const MockGraphQLResolvedConfigData = {
    schemaPath: `${pathToProjectRoot}/schema.graphql`,
    includes: ["./graphql/**/*.graphql"],
    excludes: ["./graphql/exclude/**/*.graphql"],
    extensions: {
        endpoints: {
            dev: {
                url: "https://api.github.com/graphql"
            }
        }
    }
};

const projects = {
    github: MockGraphQLResolvedConfigData
};
const MockGraphQLConfigData = Object.assign(
    {},
    MockGraphQLResolvedConfigData,
    projects
);

const MockGraphQLProjectConfig = new GraphQLProjectConfig(
    MockGraphQLConfigData,
    `${pathToProjectRoot}/.graphqlconfig`
);

const MockConcatContext = {
    config: MockGraphQLProjectConfig,
    projectRootDir: pathToProjectRoot,
    distDir: `${pathToProjectRoot}/dist`,
    output: "stdout" as "stdout",
    lang: "gql" as "gql"
};

export default MockConcatContext;
