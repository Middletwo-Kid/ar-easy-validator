import rules from './rules';
import validate from './validate';

function Validator(){
  // add rules
  Object.keys(rules).forEach((key) => {
    this[key] = rules[key];
  })

  this.validate = validate.bind(this);
}

Validator.prototype.addRule = function(key, cb){
  try {
    if(!key 
      || typeof key !== 'string'
      || key === 'validate' || key === 'addRule') {
        throw new Error(`parameter "key" is invaild in addRule, 
        it should be string, and not allow be named 'validate' or 'addRule'. `);
    } else if (!cb || typeof cb !== 'function') {
      throw new Error(`parameter "cb" is invaild in addRule, it should be a function. `);
    } else {
      this[key] = cb;
    }
  } catch (error) {
    console.error(error);
  }
}

const validator = new Validator();

export default validator;
