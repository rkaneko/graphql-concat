import test from "ava";

import path from "path";

import MockConcatContext from "./MockConcatContext";

import createDistPath from "./createDistPath";

test("Can create dist path.", t => {
    const relativeFrom = path.join("src", "SomeQuery.graphql");
    const originpath = path.join(MockConcatContext.projectRootDir, relativeFrom);
    
    const actual = createDistPath(MockConcatContext, originpath);
    const expected = path.join(MockConcatContext.distDir, "SomeQuery.graphql");
    t.is(actual, expected);
});

test("Can create dist path when lang is ts.", t => {
    const originFilename = "Somequery.graphql";
    const dirname = "graphql";
    const relativeFrom = path.join(dirname, "src", originFilename);
    const ctx = Object.assign(
        {},
        MockConcatContext,
        { distDir: `${MockConcatContext.projectRootDir}/graphql/dist`, lang: "ts" as "ts" }
    );
    const originpath = path.join(ctx.projectRootDir, relativeFrom);

    const actual = createDistPath(ctx, originpath);
    const expected = path.join(
        ctx.distDir,
        `${path.basename(originFilename, path.extname(originFilename))}.ts`,
    );
    t.is(actual, expected);
});
