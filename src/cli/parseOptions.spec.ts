import test from "ava";
import path from "path";

import parseOptions from "./parseOptions";

import * as OptionLang from "../api/OptionLang";
import * as OptionOutput from "../api/OptionOutput";

const optionIncludes = ["./graphql/src/**/*.graphql", "./graphql/src/**/*.gql"];
const optionExcludes = [
    "./graphql/dist/**/*.graphql",
    "./graphql/dist/**/*.gql"
];
const optionDist = "./graphql/dist";
const optionSchema = "./graphql/schema.json";
const optionProject = "github";

test("Should parse options specified short options.", t => {
    const argv = [
        "-i",
        optionIncludes[0],
        "-i",
        optionIncludes[1],
        "-e",
        optionExcludes[0],
        "-e",
        optionExcludes[1],
        "-d",
        optionDist,
        "-o",
        OptionOutput.OUTPUT_FILE as OptionOutput.OUTPUT_FILE,
        "-l",
        OptionLang.LANG_TS as OptionLang.LANG_TS,
        "-s",
        optionSchema,
        "-p",
        optionProject,
        "-h"
    ];
    const projectRootDir = "/path/to/project";

    const expected = {
        includes: optionIncludes.map(i => path.join(projectRootDir, i)),
        excludes: optionExcludes.map(e => path.join(projectRootDir, e)),
        dist: path.join(projectRootDir, optionDist),
        output: OptionOutput.OUTPUT_FILE as OptionOutput.OUTPUT_FILE,
        lang: OptionLang.LANG_TS as OptionLang.LANG_TS,
        schema: path.join(projectRootDir, optionSchema),
        project: optionProject,
        help: true
    };

    const actual = parseOptions(argv, projectRootDir);

    t.deepEqual(actual.includes, expected.includes);
    t.deepEqual(actual.excludes, expected.excludes);
    t.deepEqual(actual, expected);
});

test("Should parse options specified long options.", t => {
    const argv = [
        "--include",
        optionIncludes[0],
        "--include",
        optionIncludes[1],
        "--exclude",
        optionExcludes[0],
        "--exclude",
        optionExcludes[1],
        "--dist",
        optionDist,
        "--output",
        OptionOutput.OUTPUT_FILE as OptionOutput.OUTPUT_FILE,
        "--lang",
        OptionLang.LANG_TS as OptionLang.LANG_TS,
        "--schema",
        optionSchema,
        "--project",
        optionProject,
        "--help"
    ];
    const projectRootDir = process.cwd();

    const expected = {
        includes: optionIncludes.map(i => path.join(projectRootDir, i)),
        excludes: optionExcludes.map(e => path.join(projectRootDir, e)),
        dist: path.join(projectRootDir, optionDist),
        output: OptionOutput.OUTPUT_FILE as OptionOutput.OUTPUT_FILE,
        lang: OptionLang.LANG_TS as OptionLang.LANG_TS,
        schema: path.join(projectRootDir, optionSchema),
        project: optionProject,
        help: true
    };

    const actual = parseOptions(argv, projectRootDir);

    t.deepEqual(actual.includes, expected.includes);
    t.deepEqual(actual.excludes, expected.excludes);
    t.deepEqual(actual, expected);
});

test("Default Options should be appropriate when not being specified.", t => {
    const argv = [] as string[];
    const projectRootDir = process.cwd();

    const expected = {
        includes: [],
        excludes: [],
        dist: path.join(projectRootDir, "dist"),
        output: OptionOutput.OUTPUT_STDOUT as OptionOutput.OUTPUT_STDOUT,
        lang: OptionLang.LANG_GQL as OptionLang.LANG_GQL,
        schema: undefined,
        project: undefined,
        help: false
    };

    const actual = parseOptions(argv, projectRootDir);

    t.deepEqual(actual.includes, expected.includes);
    t.deepEqual(actual.excludes, expected.excludes);
    t.deepEqual(actual, expected);
});
