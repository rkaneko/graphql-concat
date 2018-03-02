import fs from "fs";

function isDirectory(pathToDir: string): boolean {
    try {
        const stats = fs.statSync(pathToDir);
        return stats.isDirectory();
    } catch (err) {
        return false;
    }
}

export default isDirectory;
