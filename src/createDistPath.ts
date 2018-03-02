import path from "path";

import ConcatContext from "./ConcatContext";

function createDistPath(
    ctx: ConcatContext,
    originpath: string
): string {
    const segments1 = ctx.projectRootDir.split(path.sep);
    const segments2 = originpath.split(path.sep);

    if (segments1.length > segments2.length) {
        throw new Error(`GraphQL file should exist in dir: ${ctx.projectRootDir}.`);
    }

    const relatives = segments2.slice(segments1.length, segments2.length);
    return path.join(ctx.distDir, ...relatives);
}

export default createDistPath;
