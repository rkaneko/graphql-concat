import commandLineArgs from "command-line-args";
import path from "path";

import OptionViaCLI from "../api/OptionViaCLI";
import toAbsolutePathLike from "../util/fs/toAbsolutePathLike";
import optionDefinitions from "./optionDefinitions";

export default function parseOptions(
    argv: string[],
    projectRootDir: string
): OptionViaCLI {
    const options = {
        argv
    };
    const {
        include,
        exclude,
        dist,
        output,
        lang,
        schema,
        project,
        help,
        version
    } = commandLineArgs(optionDefinitions, options);
    return {
        includes: (include as ReadonlyArray<string>).map(i =>
            toAbsolutePathLike(i, projectRootDir)
        ),
        excludes: (exclude as ReadonlyArray<string>).map(e =>
            toAbsolutePathLike(e, projectRootDir)
        ),
        dist: toAbsolutePathLike(dist, projectRootDir),
        output,
        lang,
        schema: schema ? toAbsolutePathLike(schema, projectRootDir) : schema,
        project,
        help,
        version
    };
}
