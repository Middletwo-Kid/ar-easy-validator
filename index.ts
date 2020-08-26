import * as validatorRules from './src/validatorRules';
import validate from './src/validate';

class Validator {
  private validate: any;

  constructor(validatorRules: any){
    // mount the hook
    Object.keys(validatorRules).forEach(key => {
      // @ts-ignore
      this[key] = validatorRules[key]
    })
    this.validate = validate;
  }
}

export const v = new Validator(validatorRules);
