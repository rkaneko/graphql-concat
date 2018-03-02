import test from "ava";
import path from "path";
import rimraf from "rimraf";

import isFile from "./isFile";
import readFileAsync from "./readFileAsync";

import writeFileAsync from "./writeFileAsync";

test("Can write a new file.", async t => {
    const segments = [
        path.resolve("/"),
        "tmp",
        "gqlcat",
        "newfile.ts"
    ];
    const pathToFile = path.join(...segments);
    const text = `
new file goes here.
Yeah!
`;

    t.false(isFile(pathToFile));

    const something = await writeFileAsync(
        pathToFile,
        text,
        { encoding: "utf-8" }
    );

    t.true(isFile(pathToFile));

    const writtenText = await readFileAsync(pathToFile, { encoding: "utf-8" });
    t.is(writtenText, text);

    // tear down
    try {
        rimraf.sync(pathToFile);
        t.pass();
    } catch (error) {
        if (error) {
            t.fail(`Failed to tear down: ${error.message}.`);
        }
    }
});
