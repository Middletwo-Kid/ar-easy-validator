import { SIGN } from './constanst';
import { isEqual } from './rules';

function checkIsObject(values) {
  return typeof values === 'object' && Object.prototype.toString.call(values) === '[object Object]';
}

function checkValidateParameter(values, rules){
  if(!values || !checkIsObject(values)){
    throw new Error(`parameter values is invalid in validate, it should be an object`);
  }else if(!Array.isArray(rules)){
    throw new Error(`parameter rules is invalid in validate, it should be an array`);
  }
  return true;
}

function checkRuleParameter(field, rules, need, tip){
  if(!field || typeof field !== 'string'){
    throw new Error(`field is invaild in rules's item`);
  }

  if(rules){
    isVaildRule.call(this, rules);
  }

  if(need && !Array.isArray(need)){
    throw new Error(`need is invaild in rules's item`);
  }

  if(tip && typeof tip !== 'string'){
    throw new Error(`tip is invaild in rules's item`);
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

function vaild(value, rules){
  const type = typeof rules;

  if(type === 'string'){
    return validRuleByString.call(this, value, rules);
  }else if(Array.isArray(rules)){
    return validRuleByArray.call(this, value, rules);
  }else {
    const key = Object.keys(rules)[0];
    const keyVal = rules[key];
    return validRuleByObject(value, key, keyVal);
  }
}

function validRuleByString(value, rule){
  return this[rule](value);
}

function validRuleByObject(value, sign, signVal){  
  switch(sign){
    case '>': return value > signVal;
    case '>=': return value >= signVal;
    case '<': return value < signVal;
    case '<=': return value <= signVal;
    case '==': return value == signVal;
    // === 可以区分NaN、+0、-0，无法深度比较对象
    default: return isEqual(value, signVal);
  }
}

function validRuleByArray(needValue, needRules){
  let shouldCheck = true;

  for(let i = 0; i < needRules.length; i++){
    const rule = needRules[i]; 
    const type = typeof rule;
    
    if(type === 'string'){
      shouldCheck = validRuleByString.call(this, needValue, rule);
    }else if(type === 'object' && !Array.isArray(rule)){
      const key = Object.keys(rule)[0];
      const keyVal = rule[key];
      shouldCheck = validRuleByObject(needValue, key, keyVal);
    }

    if(!shouldCheck) return false;
  }
  
  return true;
}

function checkValue(values, currentValue, currentRules, need){
  let shouldCheck = true;

  if(need && need.length > 0){
    for(let i = 0; i < need.length; i++){
      const needRule = need[i];

      if(!needRule.hasOwnProperty('field')){
        throw new Error(`field isn't exist`);
      }

      let { field, rules } = needRule;
      if(!rules) rules = 'isRequired';
      checkRuleParameter.call(this, field, rules);

      if(values.hasOwnProperty(field)){
        const needValue = values[field];
        shouldCheck = vaild.call(this, needValue, rules);
      }
    }
  }

  if(!shouldCheck) return true;
  if(!currentRules) currentRules = 'isRequired';
  return vaild.call(this, currentValue, currentRules);
}

function validate(values, ruleArr){
  try {
    checkValidateParameter(values, ruleArr);

    for(let i = 0; i < ruleArr.length; i++){
      const rule = ruleArr[i];

      if(!rule.hasOwnProperty('field')){
        throw new Error(`field isn't exist`);
      }

      const { field, rules, need, tip } = rule;
      checkRuleParameter.call(this, field, rules, need, tip);

      if(values.hasOwnProperty(field)){
        let flag = checkValue.call(this, values, values[field], rules, need);
        if(!flag){
          const msg = tip ? tip : `${field} is error`;
          return {
            res: false,
            msg
          }
        } 

        if(i === ruleArr.length - 1){
          return {
            res: true,
            msg: 'success'
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    return {
      res: false,
      msg: 'failure'
    }
  }
}

export default validate;
