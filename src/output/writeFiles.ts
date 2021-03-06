import { print } from "graphql/language";

import OutputFile from "./OutputFile";

import writeFileAsync from "../util/fs/writeFileAsync";

const FILE_WRITE_OPTS = { encoding: "utf-8" };

function writeFiles(outputFiles: OutputFile[]): Promise<void> {
    return Promise.all(
        outputFiles.map(outputFile =>
            writeFileAsync(
                outputFile.distpath,
                outputFile.output,
                FILE_WRITE_OPTS
            )
        )
    ).then(() => {
        outputFiles.forEach(outputFile => {
            // tslint:disable-next-line no-console
            console.log(`Created: ${outputFile.distpath} .`);
        });
    });
}

export default writeFiles;
