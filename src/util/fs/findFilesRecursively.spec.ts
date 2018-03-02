import test from "ava";
import path from "path";

import findFilesRecursively from "./findFilesRecursively";
import isFile from "./isFile";

test("Can find all files' full paths.", t => {
    const thisDir = path.resolve(__dirname);
    const actual = findFilesRecursively(thisDir);

    actual.forEach(fullpath => {
        t.true(isFile(fullpath));
    });
});

test("Can find all files' full path with filters.", t => {
    const thisDir = path.resolve(__dirname);
    const isExtensionJs = (fullpath: string) => fullpath.endsWith(".js");
    const actual = findFilesRecursively(thisDir, [isExtensionJs]);

    actual.forEach(fullpath => {
        t.true(isFile(fullpath));
        t.true(isExtensionJs(fullpath));
    });
});

test("Cannot find all files' full path with filters, because result has no matched filters.", t => {
    const thisDir = path.resolve(__dirname);
    const isExtensionBlahBlah = (fullpath: string) => fullpath.endsWith(".blahblah");
    const actual = findFilesRecursively(thisDir, [isExtensionBlahBlah]);

    t.true(actual.length === 0);
});
