function validateOpts(opts: {[key: string]: string}): void {
    const {
        out,
        dist
    } = opts;
    if (out === "file" && typeof dist === "undefined") {
        throw new Error("You must specify opt: dist when you specify 'file' as opt: out.");
    }
}

export default validateOpts;
