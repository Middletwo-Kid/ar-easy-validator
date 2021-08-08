import { Rules } from './validate';
declare class Validator {
    isRequired: (val: any) => boolean;
    isEmpty: (val: any) => boolean;
    isEqual: (val: any, second: any) => boolean;
    isEmail: (val: any) => boolean;
    isMobile: (val: any) => boolean;
    isConcat: (val: any) => boolean;
    isWx: (val: any) => boolean;
    isName: (val: any) => boolean;
    isNumber: (val: any) => boolean;
    isPositiveInt: (val: any) => boolean;
    isBankcard: (val: any) => boolean;
    isAge: (val: any) => boolean;
    isMoney: (val: any) => boolean;
    isChinese: (val: any) => boolean;
    isEnglish: (val: any) => boolean;
    isUrl: (val: any) => boolean;
    isIdcard: (val: any) => boolean;
    validate: (val: {
        [key: string]: any;
    }, rules: Rules[]) => {
        res: boolean;
        msg: string;
    } | undefined;
    addRule: (key: string, cb: () => boolean) => void;
    constructor();
}
declare const validator: Validator;
export default validator;
