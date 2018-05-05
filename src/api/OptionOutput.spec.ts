import test from "ava";

import * as OptionOutput from "./OptionOutput";

test("Should get an appropriate output type from input string value.", t => {
    const specs = [
        {
            input: {
                value: "stdout"
            },
            expected: {
                output: OptionOutput.OUTPUT_STDOUT
            }
        },
        {
            input: {
                value: "file"
            },
            expected: {
                output: OptionOutput.OUTPUT_FILE
            }
        },
        {
            input: {
                value: ""
            },
            expected: {
                output: OptionOutput.OUTPUT_STDOUT
            }
        }
    ];

    specs.forEach(spec => {
        const actual = OptionOutput.valueOf(spec.input.value);

        t.is(actual, spec.expected.output);
    });
});
