import fs from "fs";
import path from "path";
import { promisify } from "util";

import mkdirpAsync from "./mkdirpAsync";

const _writeFileAsync = promisify(fs.writeFile);

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
            console.log(`Created new dir: ${dir} .`);
        }
        return _writeFileAsync(file, data, options);
    });
}
