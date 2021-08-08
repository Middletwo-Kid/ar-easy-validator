import rules from './rules';
import { default as validateFn, Rules }  from './validate';

class Validator{
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
  validate: (val: {[key: string]: any}, rules: Rules[]) => {res: boolean, msg: string}  | undefined;
  addRule: (key: string, cb: () => boolean) => void;

  constructor(){
    // add rules
    // const keys: RuelsKey[] = Object.keys(rules) as RuelsKey[];
    // keys.forEach((key: RuelsKey) => {
    //   key = key as RuelsKey;
    //   this[key] = rules[key];
    // })
    this.isRequired = rules['isRequired'];
    this.isEmpty = rules['isEmpty'];
    this.isEqual = rules['isEqual'];
    this.isEmail = rules['isEmail'];
    this.isMobile = rules['isMobile'];
    this.isConcat = rules['isConcat'];
    this.isWx = rules['isWx'];
    this.isName = rules['isName'];
    this.isNumber = rules['isNumber'];
    this.isPositiveInt = rules['isPositiveInt'];
    this.isBankcard = rules['isBankcard'];
    this.isAge = rules['isAge'];
    this.isMoney = rules['isMoney'];
    this.isChinese = rules['isChinese'];
    this.isEnglish = rules['isEnglish'];
    this.isUrl = rules['isUrl'];
    this.isIdcard = rules['isIdcard'];
    this.validate = validateFn;
    this.addRule = (key: string, cb: () => boolean) =>{
      try {
        if(!key 
          || typeof key !== 'string'
          || key === 'validate' || key === 'addRule') {
            throw new Error(`parameter "key" is invaild in addRule, 
            it should be string, and not allow be named 'validate' or 'addRule'. `);
        } else if (!cb || typeof cb !== 'function') {
          throw new Error(`parameter "cb" is invaild in addRule, it should be a function. `);
        } else {
          // @ts-ignore
          this[key] = cb;
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}

const validator = new Validator();

export default validator;
