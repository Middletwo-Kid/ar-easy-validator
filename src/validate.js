import { SIGN } from './constanst';

function checkIsObject(values) {
  return typeof values === 'object' && Object.prototype.toString.call(values) === '[object Object]';
}

function checkParameter(values, rules){
  try {
    if(!values || !checkIsObject(values)){
      throw new Error(`parameter values is invalid in validate, it should be an object`);
    }else if(!rules || !Array.isArray(rules)){
      throw new Error(`parameter rules is invalid in validate`);
    }
  } catch (error) {
    console.error(error);
  }
}

function checkRule(field, rules, need, tip){
  try {
    if(!field || typeof field !== 'string'){
      throw new Error(`field is invaild in rules's item`);
    }

    isVaildRule.call(this, rules);

    if(need && !Array.isArray(need)){
      throw new Error(`need is invaild in rules's item`);
    }

    if(tip && typeof tip !== 'string'){
      throw new Error(`tip is invaild in rules's item`);
    }

  } catch (error) {
    console.error(error);
  }
}

function isVaildRule(rules){
  const type = typeof rules;

  if(type !== 'string' 
    && !checkIsObject(rules) 
    && !Array.isArray(rules)){
    throw new Error(`rules should be string or object or array`);
  } else if(type === 'string' && ((rules === 'validate' || rules === 'addRule') || !this.hasOwnProperty(rules))){
    throw new Error(`rules doesn't exist`);
  } else if(type === 'object' && !Array.isArray(rules)){
    const keys = Object.keys(rules);
    if(keys.length === 0 || keys.length > 1){
      throw new Error(`rules is invaild`);
    } else if(!SIGN.includes(keys[0])){
      throw new Error(`when rules is an object, rules'key should be on of [ ${SIGN.join(', ')} ]`);
    }
  } else if(Array.isArray(rules) && rules.length > 0){
    for(let i = 0; i < rules.length; i++){
      const rule = rules[i];

      // check the rule of rules, but omitting the array
      if(typeof rule === 'string' || checkIsObject(rule)){
        isVaildRule.call(this, rule);
      }else {
        throw new Error(`when rules is an array, it' children should be string or an object`);
      }
    }
  }
}

const checkValue = (value, valueRules, need, tip) => {
  try {
    if(need){
      for(let i = 0; i < need.length; i++){
        const needRule = need[i];
        const { field, rules } = needRule;
        checkRule(field, rules);
      }
    }
  } catch (error) {
    
  }
}

function validate(values, rules){
  checkParameter(values, rules);

  for(let i = 0; i < rules.length; i++){
    const rule = rules[i];

    try {
      const { field, rules, need, tip } = rule;
      checkRule.call(this, field, rules, need, tip);

      // if(Object.prototype.hasOwnProperty(field)){
      //   checkValue.call(this, values[field], rules, need, tip);
      // }
      
    } catch (error) {
      console.error(error);
    }
  }
}

export default validate;
