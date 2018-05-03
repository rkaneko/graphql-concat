import test from "ava";

import path from "path";

import createDistPath from "./createDistPath";
import * as OptionLang from "./OptionLang";

test("Can create dist path.", t => {
    const projectRootDir = path.join("/", "path", "to", "project");
    const dist = path.join(projectRootDir, "dist");
    const lang = OptionLang.LANG_GQL as OptionLang.LANG_GQL;
    const relativeFrom = path.join("src", "SomeQuery.graphql");
    const originpath = path.join(projectRootDir, relativeFrom);

    const actual = createDistPath(projectRootDir, lang, dist, originpath);
    const expected = path.join(dist, "SomeQuery.graphql");
    t.is(actual, expected);
});

test("Can create dist path when lang is ts.", t => {
    const projectRootDir = path.join("/", "path", "to", "project");
    const lang = OptionLang.LANG_TS as OptionLang.LANG_TS;
    const dist = path.join(projectRootDir, "graphql", "dist");
    const originFilename = "Somequery.graphql";
    const relativeFrom = path.join("graphql", "src", originFilename);
    const originpath = path.join(projectRootDir, relativeFrom);

    const actual = createDistPath(projectRootDir, lang, dist, originpath);
    const expected = path.join(
        dist,
        `${path.basename(originFilename, path.extname(originFilename))}.ts`
    );
    t.is(actual, expected);
});
