import path from "path";

import compute from "./compute";
import loadConfig from "./loadConfig";
import preprocess from "./preprocess";

import * as CommandOptions from "./cli/CommandOptions";

async function main() {
    // TODO get project root dir on npm project
    const cwd: string = process.cwd();
    const pathToConfig = path.join(
        cwd,
        ".graphqlconfig"
    );
    const projectName = "github";
    const config = loadConfig(pathToConfig, projectName);
    // console.log(config);

    // TODO option from command line args
    const opts = {
        dist: "./graphql/dist",
        output: "file",
        lang: "gql"
    };
    const distDir = opts.dist
        ? path.join(cwd, opts.dist)
        : config.configDir
        ? path.join(config.configDir, "dist")
        : path.join(cwd, "dist");
    const ctx = {
        config,
        projectRootDir: config.configDir || cwd,
        distDir,
        output: opts.output as CommandOptions.OutputFormat,
        lang: opts.lang as CommandOptions.OutputLanguage
    };

    const preprocessed = await preprocess(ctx);
    await compute(ctx, preprocessed);
}

process.on("unhandledRejection", console.error);
main()
    .then(() => {
        console.log("Completed!"); 
    })
    .catch(e => {
        console.error(e, e.message, e.stack);
        process.exit(1);
    });
