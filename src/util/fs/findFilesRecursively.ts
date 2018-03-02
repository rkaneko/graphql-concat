import fs from "fs";
import path from "path";

import isDirectory from "./isDirectory";
import isFile from "./isFile";

type FileFilter = (fullpath: string) => boolean;

function findFilesRecursively(pathToDir: string, filters: FileFilter[] = []): string[] {
    return fs.readdirSync(pathToDir).map(filename => {
        const fullpath = path.join(pathToDir, filename);
        if (isFile(fullpath)) {
            if (filters.length === 0) {
                return [fullpath];
            }
            const matched = filters.reduce<boolean>((m, filter) => m || filter(fullpath), false);
            return matched ? [fullpath] : [];
        } else if (isDirectory(fullpath)) {
            return findFilesRecursively(fullpath, filters);
        }
        return [];
    }).reduce<string[]>((files, filesInDir) =>
        files.concat(filesInDir)
    , []);
}

export default findFilesRecursively;
