import commandLineUsage from "command-line-usage";

import VERSION from "./version";

import * as OptionLang from "../api/OptionLang";
import * as OptionOutput from "../api/OptionOutput";
import optionDefinitions from "./optionDefinitions";

const sections = [
    {
        header: "graphql-concat",
        content:
            "Concatenate multiple GraphQL files to executable operation files."
    },
    {
        header: "Version",
        content: VERSION
    },
    {
        header: "Synopsis",
        content: [
            `$ gqlcat [{bold --include} {underline glob}] [{bold --execlude} {underline glob}] [{bold --dist} {underline path}] [{bold --output} {underline ${OptionOutput.values().join(
                "|"
            )}}] [{bold --lang} {underline ${OptionLang.values().join(
                "|"
            )}}] [{bold --schema} {underline path}] [{bold --project} {underline graphql-project-name}]`,
            `$ gqlcat {bold --help}`
        ]
    },
    {
        header: "Options",
        optionList: optionDefinitions
    },
    {
        header: "Examples",
        content: [
            {
                desc: "Case: Specifying all options via command line args.",
                example: `$ gqlcat -i "./src/**/*.graphql" -i "./src/**/*.gql" -e "./dist/**/*.graphql" -d ./dist -o ${
                    OptionOutput.OUTPUT_FILE
                } -l ${OptionLang.LANG_TS} -s ./src/schema.json`
            },
            {
                desc: "Case: Using your {italic .graphqlconfig}.",
                example: `$ gqlcat -d ./dist -o ${
                    OptionOutput.OUTPUT_STDOUT
                } -l ${OptionLang.LANG_GQL} -p github`
            }
        ]
    },
    {
        header: "About",
        content: `Project home: {underline https://github.com/rkaneko/graphql-concat}`
    }
];

export default commandLineUsage(sections);
