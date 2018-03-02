import test from "ava";
import path from "path";

import isDirectory from "./isDirectory";

test("If the resource specified with path is directory, return true.", t => {
    const actual = isDirectory(__dirname);

    t.true(actual);
});

test("If the resource specified with path is file, return false.", t => {
    const pathToSut = path.resolve(path.join(__dirname, "isDirectory.js"));
    const actual = isDirectory(pathToSut);

    t.false(actual);
});

test("If the resource specified with path doesn't exist, return false.", t => {
    const pathToFictional = path.resolve("./this-is-fictional-file.blahblah");
    const actual = isDirectory(pathToFictional);

    t.false(actual);
});
