import test from "ava";
import path from "path";

import toAbsolutePathLike from "./toAbsolutePathLike";

test("Should return an absolute path if input is relative path or glob", t => {
    const projectRootDir1 = "/path/to/project";
    const projectRootDir2 = process.cwd();
    const specs = [
        {
            input: {
                pathLike: "./graphql/some.graphql",
                projectRootDir: projectRootDir1
            },
            expected: {
                absolutePath: `${projectRootDir1}/graphql/some.graphql`
            }
        },
        {
            input: {
                pathLike: "./graphql/**/*.graphql",
                projectRootDir: projectRootDir1
            },
            expected: {
                absolutePath: `${projectRootDir1}/graphql/**/*.graphql`
            }
        },
        {
            input: {
                pathLike: "dist"
            },
            expected: {
                absolutePath: `${projectRootDir2}/dist`
            }
        }
    ];

    specs.forEach(spec => {
        if (spec.input.projectRootDir) {
            const actual = toAbsolutePathLike(
                spec.input.pathLike,
                spec.input.projectRootDir
            );
            t.is(actual, spec.expected.absolutePath);
        } else {
            const actual = toAbsolutePathLike(spec.input.pathLike);
            t.is(actual, spec.expected.absolutePath);
        }
    });
});
