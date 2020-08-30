import * as validatorRules from './src/validatorRules';
import validateFn from './src/validate';

class Validator {
  public validate: any;

  constructor(validatorRules: any){
    Object.keys(validatorRules).forEach(key => {
      // @ts-ignore
      this[key] = validatorRules[key]
    })
    this.validate = validateFn;
  }

  addRules(key: string, fn: any){
    try {
      if(key === 'validate' || key === 'addRules') throw new Error(`新添加的规则不可命名为${key}`);
      if(typeof fn !== 'function') throw new Error(`addRules传参错误`);
      // @ts-ignore
      this[key] = fn;
    } catch (error) {
      console.error(error);
    }
  }
}

export const validator = new Validator(validatorRules);
