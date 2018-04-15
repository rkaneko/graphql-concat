import test from "ava";

import path from "path";

import MockConcatContext from "./MockConcatContext";

import createDistPath from "./createDistPath";

test("Can create dist path.", t => {
    const relativeFrom = path.join("graphql", "SomeQuery.graphql");
    const originpath = path.join(MockConcatContext.projectRootDir, relativeFrom);
    
    const actual = createDistPath(MockConcatContext, originpath);
    const expected = path.join(MockConcatContext.distDir, relativeFrom);
    t.is(actual, expected);
});

test("Can create dist path when lang is ts.", t => {
    const originFilename = "Somequery.graphql";
    const dirname = "graphql";
    const relativeFrom = path.join(dirname, originFilename);
    const ctx = Object.assign({}, MockConcatContext, { lang: "ts" as "ts" });
    const originpath = path.join(ctx.projectRootDir, relativeFrom);

    const actual = createDistPath(ctx, originpath);
    const expected = path.join(
        ctx.distDir,
        dirname,
        `${path.basename(originFilename, path.extname(originFilename))}.ts`,
    );
    t.is(actual, expected);
});
