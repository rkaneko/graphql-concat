import test from "ava";

import * as OptionLang from "./OptionLang";

test("Should get an appropriate lang type from input string value.", t => {
    const specs = [
        {
            input: {
                value: "gql"
            },
            expected: {
                lang: OptionLang.LANG_GQL
            }
        },
        {
            input: {
                value: "ts"
            },
            expected: {
                lang: OptionLang.LANG_TS
            }
        },
        {
            input: {
                value: ""
            },
            expected: {
                lang: OptionLang.LANG_GQL
            }
        }
    ];

    specs.forEach(spec => {
        const actual = OptionLang.valueOf(spec.input.value);

        t.is(actual, spec.expected.lang);
    });
});
