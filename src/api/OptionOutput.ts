export const OUTPUT_STDOUT = "stdout";
export type OUTPUT_STDOUT = "stdout";
export const OUTPUT_FILE = "file";
export type OUTPUT_FILE = "file";

export type OptionOutput = OUTPUT_STDOUT | OUTPUT_FILE;

export function valueOf(v: string): OptionOutput {
    if (v === OUTPUT_STDOUT) {
        return OUTPUT_STDOUT as OUTPUT_STDOUT;
    } else if (v === OUTPUT_FILE) {
        return OUTPUT_FILE as OUTPUT_FILE;
    }
    return OUTPUT_STDOUT as OUTPUT_STDOUT;
}

export function values(): ReadonlyArray<OptionOutput> {
    return [OUTPUT_STDOUT as OUTPUT_STDOUT, OUTPUT_FILE as OUTPUT_FILE];
}
