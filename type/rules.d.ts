export declare type RegexKey = 'is_email' | 'is_mobile' | 'is_concat' | 'is_name' | 'is_number' | 'is_bankcard' | 'is_age' | 'is_money' | 'is_positive_int' | 'is_chinese' | 'is_english' | 'is_url' | 'is_id';
export declare type Regex = {
    [K in RegexKey]: RegExp;
};
export declare type RuelsKey = 'isRequired' | 'isEmail' | 'isMobile' | 'isConcat' | 'isWx' | 'isName' | 'isNumber' | 'isPositiveInt' | 'isBankcard' | 'isAge' | 'isMoney' | 'isChinese' | 'isEnglish' | 'isUrl' | 'isIdcard' | 'isEmpty' | 'isEqual';
export declare type Rules = {
    [K in RuelsKey]: (val: any, secondVal?: any) => boolean;
};
export declare const isEqual: (x: any, y: any) => boolean;
declare const rules: Rules;
export default rules;
