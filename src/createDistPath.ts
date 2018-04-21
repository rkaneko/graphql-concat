import path from "path";

import ConcatContext from "./ConcatContext";

function createDistPath(ctx: ConcatContext, originpath: string): string {
    const segments1 = ctx.projectRootDir.split(path.sep);
    const segments2 = originpath.split(path.sep);
    const segments3 = ctx.distDir.split(path.sep);

    if (segments1.length > segments2.length) {
        throw new Error(
            `GraphQL file should exist in dir: ${ctx.projectRootDir}.`
        );
    }

    const filename = path.basename(originpath);
    const basename =
        ctx.lang === "gql"
            ? filename
            : `${path.basename(filename, path.extname(filename))}.${ctx.lang}`;

    const relativeToDir = segments2.slice(
        segments3.length,
        segments2.length - 1
    );
    return path.join(ctx.distDir, ...relativeToDir, basename);
}

export default createDistPath;
