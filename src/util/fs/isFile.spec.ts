import test from "ava";
import path from "path";

import isFile from "./isFile";

test("If the resource specified with path is file, return true.", t => {
    const pathToSut = path.resolve(path.join(__dirname, "isFile.js"));
    const actual = isFile(pathToSut);

    t.true(actual);
});

test("If the resource specified with path is directory, return false.", t => {
    const actual = isFile(__dirname);

    t.false(actual);
});

test("If the resource specified with path doesn't exist, return false.", t => {
    const pathToFictional = path.resolve("./this-is-fictional-file.blahblah");
    const actual = isFile(pathToFictional);

    t.false(actual);
});
