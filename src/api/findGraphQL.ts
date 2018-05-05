import minimatch from "minimatch";
import path from "path";

import findFilesRecursively from "../util/fs/findFilesRecursively";

function findGraphQL(
    projectRootDir: string,
    includes: ReadonlyArray<string> = [],
    excludes: ReadonlyArray<string> = []
): string[] {
    const includeFilter = isTarget(includes, excludes);
    return findFilesRecursively(projectRootDir, [includeFilter]);
}

const DEFAULT_IGNORES = ["node_modules", ".git"];

function shouldIgnore(file: string): boolean {
    for (const ignore of DEFAULT_IGNORES) {
        if (file.includes(ignore)) {
            return true;
        }
    }
    return false;
}

function isTarget(
    includes: ReadonlyArray<string>,
    excludes: ReadonlyArray<string>
): (file: string) => boolean {
    return (file: string) => {
        if (includes.length === 0 && excludes.length === 0) {
            return isGraphQL(file);
        }
        if (shouldIgnore(file)) {
            return false;
        }
        return matchedIn(file, includes) && !matchedIn(file, excludes);
    };
}

function matchedIn(file: string, candidates: ReadonlyArray<string>): boolean {
    for (const candidate of candidates) {
        if (minimatch(file, candidate)) {
            return true;
        }
    }
    return false;
}

function isGraphQL(file: string): boolean {
    const extname = path.extname(file);
    return extname === ".graphql" || extname === ".gql";
}

export default findGraphQL;
