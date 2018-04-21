import fs from "fs";
import path from "path";
import { promisify } from "util";

import mkdirpAsync from "./mkdirpAsync";

const promisified = promisify(fs.writeFile);

export default function writeFileAsync(
    file: string,
    data: string,
    options?: {
        encoding?: string;
        mode?: number;
        flag?: string;
    }
) {
    const parentDir = path.dirname(file);
    return mkdirpAsync(parentDir).then(dir => {
        if (dir) {
            // tslint:disable-next-line no-console
            console.log(`Created new dir: ${dir} .`);
        }
        return promisified(file, data, options);
    });
}
