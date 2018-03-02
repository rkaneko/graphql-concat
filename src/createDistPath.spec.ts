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
