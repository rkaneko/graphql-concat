import { DocumentNode } from "graphql/language";

import compute from "./compute";
import Computed from "./Computed";
import ConcatOption from "./ConcatOption";

export default function api(
    projectRootDir: string,
    option: ConcatOption
): Promise<Computed> {
    return compute(projectRootDir, option);
}
