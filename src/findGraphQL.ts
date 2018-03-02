import path from "path";

import ConcatContext from "./ConcatContext";

import findFilesRecursively from "./util/fs/findFilesRecursively";

function findGraphQL(ctx: ConcatContext): string[] {
    const includes = (fullpath: string) => ctx.config.includesFile(fullpath) && isGraphQL(fullpath);
    return findFilesRecursively(ctx.projectRootDir, [includes]);
}

function isGraphQL(fullpath: string): boolean {
    const extname = path.extname(fullpath);
    return extname === ".graphql" || extname === ".gql";
}

export default findGraphQL;
