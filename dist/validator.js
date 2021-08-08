(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Validator = factory());
}(this, (function () { 'use strict';

  const CITY ={
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  };

  const SIGN = [ '>', '<', '>=', '<=', '==', '==='];

  const regex = {
    is_email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    is_mobile: /^1[3456789][0-9]{9}$/,
    is_concat: /(^(\d{3,4}-)?\d{6,8}$)|(^1[3456789][0-9]{9}$)/,
    is_name: /^[\u4E00-\u9FA5]{2,4}$/,
    is_number: /^\d+$|^\d*\.\d+$/,
    is_bankcard: /^[0-9]{16,19}$/,
    is_age: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
    is_money: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
    is_positive_int: /^[0-9]+$/,
    is_chinese: /^[\u4E00-\u9FA5]+$/,
    is_english: /^[A-Za-z]+$/,
    is_url: /[a-zA-z]+:\/\/[^\s]/,
    is_id: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
  };

  const isEmpty = (val) => {
    const type = typeof val;

    if((type === 'undefined')
      || (type === 'string' && val.length === 0)
      || (type === 'object' && !val)
      || (type === 'object' && Array.isArray(val) && val.length === 0)
      || (type === 'object' && Object.keys(val).length === 0)) return true;

    return false;
  };

  const is = (x, y) => {
    // 要区分0、 +0、-0和NaN的情况
    if(x === y){
      return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };

  const isEqual = (x, y) => {
    if(is(x, y)) return true;

    if(typeof x !== 'object'
      || x === null
      || typeof y !== 'object'
      || y === null){
        return false;
    }

    const xKeys = Object.keys(x);
    const yKeys = Object.keys(y);

    if(xKeys.length !== yKeys.length) return false;

    for(let i = 0; i < xKeys.length; i++){
      const key = xKeys[i];

      if(!Object.prototype.hasOwnProperty.call(y, key)
        || !is(x[key], y[key])){
          return false;
      }
    }

    return true;
  };

  const isRequired = (val) => !isEmpty(val);
  const isEmail = (val) => regex.is_email.test(val);
  const isMobile = (val) => regex.is_mobile.test(val);
  const isConcat = (val) => regex.is_concat.test(val);
  const isWx = (val) => regex.is_mobile.test(val) || /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(val);
  const isName = (val) => regex.is_name.test(val);
  const isNumber = (val) => regex.is_number.test(val);
  const isPositiveInt = (val) => regex.is_positive_int.test(val);
  const isBankcard = (val) => regex.is_bankcard.test(val);
  const isAge = (val) => regex.is_age.test(val);
  const isMoney = (val) => regex.is_money.test(val);
  const isChinese = (val) => regex.is_chinese.test(val);
  const isEnglish = (val) => isRequired(val) && regex.is_english.test(val);
  const isUrl = (val) => regex.is_url.test(val);
  const isIdcard = (code) => {
    const city = CITY;
    let pass = true;

    if(isEmpty(code) 
      || !(regex.is_id.test(code))
      || !city[code.substr(0,2)]){
      return false;
    }else {
      if(code.length == 18){
        code = code.split('');
        const factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
        const parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
        let sum = 0;
        let ai = 0;
        let wi = 0;
        for (let i = 0; i < 17; i++)
        { 
          ai = Number(code[i]);
          wi = factor[i];
          sum += ai * wi;
        }
        if(parity[sum % 11] != code[17].toUpperCase()){
          pass=false;
        }
      }
      return (code != undefined) && pass ;
    }
  };

  var rules = {
    isRequired,
    isEmpty,
    isEqual,
    isEmail,
    isMobile,
    isConcat,
    isWx,
    isName,
    isNumber,
    isPositiveInt,
    isBankcard,
    isAge,
    isMoney,
    isChinese,
    isEnglish,
    isUrl,
    isIdcard
  };

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

  function Validator(){
    // add rules
    Object.keys(rules).forEach((key) => {
      this[key] = rules[key];
    });

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
  };

  const validator = new Validator();

  return validator;

})));
