import test from "ava";
import path from "path";

import findGraphQL from "./findGraphQL";

test("Can find GraphQL files considering .graphqlconfig.", t => {
    const projectRootDir = process.cwd();
    const includes = [path.join(projectRootDir, "./graphql/**/*.graphql")];
    const excludes = [
        path.join(projectRootDir, "./graphql/dist/**/*.graphql"),
        path.join(projectRootDir, "./graphql/exec/**/*.graphql")
    ];
    const actual = findGraphQL(projectRootDir, includes, excludes);

    t.true(actual.length > 0);
    const graphqls = actual
        .map(path.extname)
        .filter(extname => extname === ".graphql" || extname === ".gql");
    t.true(actual.length === graphqls.length);
});
