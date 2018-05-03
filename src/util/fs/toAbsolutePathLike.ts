import path from "path";

export default function toAbsolutePathLike(
    pathLike: string,
    projectRootDir?: string
): string {
    const cwd = projectRootDir ? projectRootDir : process.cwd();
    return path.join(cwd, pathLike);
}
