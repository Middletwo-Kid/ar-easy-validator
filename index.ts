import * as validatorRules from './src/validatorRules';
import validate from './src/validate';

class Validator {
  private validate: any;

  constructor(validatorRules: any){
    Object.keys(validatorRules).forEach(key => {
      // @ts-ignore
      this[key] = validatorRules[key]
    })
    this.validate = validate;
  }
}

export const validator = new Validator(validatorRules);
