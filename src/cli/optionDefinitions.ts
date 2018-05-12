import commandLineArgs from "command-line-args";

import * as OptionLang from "../api/OptionLang";
import * as OptionOutput from "../api/OptionOutput";

const DEFAULT_INCLUDE = ["./**/*.graphql", "./**/*.gql"];
const DEFAULT_EXCLUDE = [] as ReadonlyArray<string>;
const DEFAULT_DIST = "dist";
const DEFAULT_OUTPUT = OptionOutput.OUTPUT_STDOUT as OptionOutput.OUTPUT_STDOUT;
const DEFAULT_LANG = OptionLang.LANG_GQL as OptionLang.LANG_GQL;

const optionDefinitions = [
    {
        name: "include",
        alias: "i",
        type: String,
        multiple: true,
        defaultValue: DEFAULT_INCLUDE,
        description: `Files you want to include. Default is "${DEFAULT_INCLUDE.join(
            `" "`
        )}". You can specify this option multiply. This option also can be specified via {italic .graphqlconfig} {underline includes} values.`
    },
    {
        name: "exclude",
        alias: "e",
        type: String,
        multiple: true,
        defaultValue: DEFAULT_EXCLUDE,
        description:
            "Files you want to exclude. Default is not set. You can specify this option multiply. This option also can be specified via {italic .graphqlconfig} {underline excludes} values."
    },
    {
        name: "dist",
        alias: "d",
        type: String,
        defaultValue: DEFAULT_DIST,
        description: `Path to distination of gqlcat outputs. Default is ${DEFAULT_DIST}.`
    },
    {
        name: "output",
        alias: "o",
        type: (output: string) => OptionOutput.valueOf(output),
        defaultValue: DEFAULT_OUTPUT,
        description: `Output type. Default is ${DEFAULT_OUTPUT}.`
    },
    {
        name: "lang",
        alias: "l",
        type: (type: string) => OptionLang.valueOf(type),
        defaultValue: DEFAULT_LANG,
        description: `Language type. Default is ${DEFAULT_LANG}.`
    },
    {
        name: "schema",
        alias: "s",
        type: String,
        description:
            "Path to schema.json of your project. This is used for validating concatenated files. Default is not set, so validation isn't executed. This option also can be specified via {italic .graphqlconfig} {underline schemaPath} value."
    },
    {
        name: "project",
        alias: "p",
        type: String,
        description:
            "Your project name. If your {italic .graphqlconfig} file has multiple project configs, you must specify this option. Default is not set."
    },
    {
        name: "help",
        alias: "h",
        type: Boolean,
        defaultValue: false,
        description: "Display usage."
    },
    {
        name: "version",
        alias: "v",
        type: Boolean,
        defaultValue: false,
        description: "Display version."
    }
];

export default optionDefinitions;
