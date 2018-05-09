#!/usr/bin/env node

/**
 * @author rkaneko
 * @copyright 2018 Ryota Kaneko. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
"use strict";

import path from "path";

import parseOptions from "./parseOptions";
import usage from "./usage";

import api from "../api";
import loadConfig from "../config/loadConfig";
import run from "../output";

async function gqlcat(): Promise<void> {
    const projectRootDir: string = process.cwd();
    const optionViaCLI = parseOptions(process.argv, projectRootDir);
    if (optionViaCLI.help) {
        // tslint:disable-next-line no-console
        console.log(usage);
        process.exit(0);
    }

    const pathToConfig = path.join(projectRootDir, ".graphqlconfig");
    const optionViaConfig = loadConfig(
        pathToConfig,
        projectRootDir,
        optionViaCLI.project
    );

    const concatOption =
        optionViaConfig !== null
            ? Object.assign({}, optionViaCLI, optionViaConfig)
            : optionViaCLI;
    // console.log(concatOption);

    const computed = await api(projectRootDir, concatOption);

    await run(computed, concatOption.output, concatOption.lang);
}

process.on("unhandledRejection", console.error);
gqlcat()
    .then(() => {
        // tslint:disable-next-line no-console
        console.log("Completed!");
        process.exit(0);
    })
    .catch(e => {
        // tslint:disable-next-line no-console
        console.error(e);
        process.exit(1);
    });
