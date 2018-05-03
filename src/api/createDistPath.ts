import path from "path";

import * as OptionLang from "./OptionLang";

function createDistPath(
    projectRootDir: string,
    lang: OptionLang.OptionLang,
    dist: string,
    originpath: string
): string {
    const segments1 = projectRootDir.split(path.sep);
    const segments2 = originpath.split(path.sep);
    const segments3 = dist.split(path.sep);

    if (segments1.length > segments2.length) {
        throw new Error(`GraphQL file should exist in dir: ${projectRootDir}.`);
    }

    const filename = path.basename(originpath);
    const basename =
        lang === OptionLang.LANG_GQL
            ? filename
            : `${path.basename(filename, path.extname(filename))}.${lang}`;

    const relativeToDir = segments2.slice(
        segments3.length,
        segments2.length - 1
    );
    return path.join(dist, ...relativeToDir, basename);
}

export default createDistPath;
