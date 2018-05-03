export const LANG_GQL = "gql";
export type LANG_GQL = "gql";
export const LANG_TS = "ts";
export type LANG_TS = "ts";

export type OptionLang = LANG_GQL | LANG_TS;

export function valueOf(v: string): OptionLang {
    if (v === LANG_GQL) {
        return LANG_GQL as LANG_GQL;
    } else if (v === LANG_TS) {
        return LANG_TS as LANG_TS;
    }
    return LANG_GQL as LANG_GQL;
}

export function values(): ReadonlyArray<OptionLang> {
    return [LANG_GQL as LANG_GQL, LANG_TS as LANG_TS];
}
