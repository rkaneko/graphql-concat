#!/usr/bin/env node

/**
 * @author rkaneko
 * @copyright 2018 Ryota Kaneko. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

import path from "path";

import parseOpts from "./cli/parseOpts";

import compute from "./compute";
import loadConfig from "./loadConfig";
import preprocess from "./preprocess";

import * as CommandOptions from "./cli/CommandOptions";

async function main() {
    const command = parseOpts(process.argv);
    const opts = command.opts();
    // console.log(opts);

    // TODO get project root dir on npm project
    const cwd: string = process.cwd();
    const pathToConfig = path.join(cwd, ".graphqlconfig");

    const config = loadConfig(pathToConfig, opts.project);
    // console.log(config);

    const distDir = opts.dist
        ? path.resolve(cwd, opts.dist)
        : config.configDir
            ? path.resolve(config.configDir, "dist")
            : path.resolve(cwd, "dist");
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
