import test from "ava";
import path from "path";
import rimraf from "rimraf";

import isDirectory from "./isDirectory";

import mkdirpAsync from "./mkdirpAsync";

test("Can mkdir -p if target path hasn't existed yet.", async t => {
    const segments = [
        path.resolve("/"),
        "tmp",
        "gqlcat",
        "path",
        "to",
        "gql"
    ];
    const pathToDir = path.join(...segments);

    t.false(isDirectory(pathToDir));

    const dir = await mkdirpAsync(pathToDir);

    if (typeof dir === "string") {
        t.true(isDirectory(dir));
    }
    t.true(isDirectory(pathToDir));

    // tear down
    try {
        const rmdir = path.join(...segments.slice(0, 3));
        rimraf.sync(rmdir);
        t.pass();
    } catch (e) {
        if (e) {
            t.fail(`Failed to tear down: ${e.message}.`);
        }
    }
});
