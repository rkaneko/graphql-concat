import test from "ava";
import path from "path";

import findGraphQL from "./findGraphQL";
import loadConfig from "./loadConfig";

test("Can find GraphQL files considering .graphqlconfig.", t => {
    const projectRootDir = process.cwd();
    const config = loadConfig(projectRootDir, "github");
    const ctx = {
        config,
        projectRootDir,
        distDir: `${projectRootDir}/dist`,
        output: "stdout" as "stdout",
        lang: "gql" as "gql"
    };
    const actual = findGraphQL(ctx);

    t.true(actual.length > 0);
    const graphqls = actual
        .map(path.extname)
        .filter(extname => extname === ".graphql" || extname === ".gql");
    t.true(actual.length === graphqls.length);
});
