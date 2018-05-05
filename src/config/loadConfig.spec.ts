import test from "ava";
import path from "path";

import loadConfig from "./loadConfig";

test("Should load .graphqlconfig when .graphqlconfig exists in project root directory.", t => {
    const projectRootDir = process.cwd();
    const pathToConfig = path.join(projectRootDir, ".graphqlconfig");
    const projectName = "github";

    const actual = loadConfig(pathToConfig, projectRootDir, projectName);

    const expected = {
        includes: [path.join(projectRootDir, "./graphql/**/*.graphql")],
        excludes: [
            path.join(projectRootDir, "./graphql/exec/**/*.graphql"),
            path.join(projectRootDir, "./graphql/dist/**/*.graphql")
        ],
        schema: path.join(projectRootDir, "./graphql/schema.json")
    };

    t.deepEqual(actual, expected);
});

test("Should return null when .graphqlconfig doesn't exist in project root directory.", t => {
    const projectRootDir = "/tmp";
    const pathToConfig = path.join(projectRootDir, ".graphqlconfig");

    const actual = loadConfig(pathToConfig, projectRootDir);

    t.is(actual, null);
});
