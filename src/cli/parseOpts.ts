import program, { Command } from "commander";

const OUTPUT_OPTS = ["stdout", "file"];
const LANG_OPTS = ["gql", "ts"];

function callbackOptOutput(output: string, defaultValue: string) {
    if (typeof output === "undefined") {
        return defaultValue;
    }
    const pattern = `^(${OUTPUT_OPTS.join("|")})$`;
    const regex = new RegExp(pattern, "i");
    const m = regex.exec(output);
    if (!m) {
        throw new Error(
            `Output type should be either ${OUTPUT_OPTS.join(", ")} .`
        );
    }
    return m[0];
}

program
    .version("0.8.0")
    .option(
        "-o, --output [type]",
        `Output type: [${OUTPUT_OPTS.join("|")}]`,
        callbackOptOutput,
        "stdout"
    )
    .option("-d, --dist <path>", "Output directory")
    .option(
        "-l, --lang [type]",
        `Output language type: [${LANG_OPTS.join("|")}]`,
        new RegExp(`^(${LANG_OPTS.join("|")})$`, "i"),
        "gql"
    )
    .option("-p, --project [name]", "Project name for multiple graphqlconfig");

function parseOpts(argv: string[]): Command {
    return program.parse(argv);
}

export default parseOpts;
