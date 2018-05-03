import commandLineArgs from "command-line-args";

import * as OptionLang from "../api/OptionLang";
import * as OptionOutput from "../api/OptionOutput";

const optionDefinitions = [
    {
        name: "include",
        alias: "i",
        type: String,
        multiple: true,
        defaultValue: [] as ReadonlyArray<string>,
        description: "Files you want to include."
    },
    {
        name: "exclude",
        alias: "e",
        type: String,
        multiple: true,
        defaultValue: [] as ReadonlyArray<string>,
        description: "Files you want to exclude."
    },
    {
        name: "dist",
        alias: "d",
        type: String,
        defaultValue: String("dist"),
        description: "Path to distination of gqlcat outputs."
    },
    {
        name: "output",
        alias: "o",
        type: OptionOutput.valueOf,
        defaultValue: OptionOutput.OUTPUT_STDOUT,
        description: "Output type."
    },
    {
        name: "lang",
        alias: "l",
        type: OptionLang.valueOf,
        defaultValue: OptionLang.LANG_GQL,
        description: "Language type."
    },
    {
        name: "schema",
        alias: "s",
        type: String,
        description:
            "Path to schema.json of your project. This is used for validating concatenated files."
    },
    {
        name: "project",
        alias: "p",
        type: String,
        description:
            "Your project name. If your {italic .graphqlconfig} file has multiple project configs, you must specify this option."
    },
    {
        name: "help",
        alias: "h",
        type: Boolean,
        defaultValue: false,
        description: "Display usage."
    }
];

export default optionDefinitions;
