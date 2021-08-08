type RuelsKey = 'isRequired' | 'isEmail' | 'isMobile' | 'isConcat' | 'isWx'
                | 'isName' | 'isNumber' | 'isPositiveInt' | 'isBankcard' 
                | 'isAge' | 'isMoney' | 'isChinese' | 'isEnglish' | 'isUrl'
                | 'isIdcard' | 'isEmpty' | 'isEqual';

declare const isRequired: (val: any) => boolean;
declare const isEmpty: (val: any) => boolean;
declare const isEqual: (val: any, second: any) => boolean;
declare const isEmail: (val: any) => boolean;
declare const isMobile: (val: any) => boolean;
declare const isConcat: (val: any) => boolean;
declare const isWx: (val: any) => boolean;
declare const isName: (val: any) => boolean;
declare const isNumber: (val: any) => boolean;
declare const isPositiveInt: (val: any) => boolean;
declare const isBankcard: (val: any) => boolean;
declare const isAge: (val: any) => boolean;
declare const isMoney: (val: any) => boolean;
declare const isChinese: (val: any) => boolean;
declare const isEnglish: (val: any) => boolean;
declare const isUrl: (val: any) => boolean;
declare const isIdcard: (val: any) => boolean;
                
export declare class Validator {
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
  validate: (val: {[key: string]: any}, rules: RuelsKey[]) => {res: boolean, msg: string}  | undefined;
  addRule: (key: string, cb: () => boolean) => void;
}
