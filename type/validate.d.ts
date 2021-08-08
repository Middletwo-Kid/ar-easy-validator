import { SignType } from './constanst';
import { RuelsKey } from './rules';
export declare type StringRule = RuelsKey;
export declare type ObjectRule = {
    [key in SignType]: any;
};
export declare type ArrRule = Array<StringRule | ObjectRule>;
export declare type SinleRule = StringRule | ObjectRule | ArrRule;
export interface needRules {
    field: string;
    rules?: StringRule | ObjectRule;
}
export interface Rules {
    field: string;
    rules?: SinleRule;
    need?: needRules[];
    tip?: string;
}
declare function validate(this: any, values: {
    [key: string]: any;
}, ruleArr: Rules[]): {
    res: boolean;
    msg: string;
};
export default validate;
