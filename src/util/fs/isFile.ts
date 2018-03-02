import fs from "fs";

function isFile(pathToFile: string): boolean {
    try {
        const stats = fs.statSync(pathToFile);
        return stats.isFile();
    } catch (err) {
        return false;
    }
}

export default isFile;
