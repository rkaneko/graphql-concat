import OptionViaCLI from "./OptionViaCLI";
import OptionViaConfig from "./OptionViaConfig";

type ConcatOption = OptionViaConfig & OptionViaCLI;

export default ConcatOption;
