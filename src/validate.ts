import { IFormData, IFormDataRules, RulesNeed } from './type';
const sign = ['>', '>=', '==', '===', '<', '<='];
import {validator} from '../index';
let commonValidator: {[index: string] : any};
let commonVaidatorRules: any[] = [];

// 是否为空
const isEmpty = (value: any) => {
  return value == null || value === '' || (Array.isArray(value) && value.length == 0) || typeof value == 'undefined' || JSON.stringify(value) == '{}';
}

// 校验函数的参数(formData和rules)
const checkFormAndRules = (formData: IFormData, rules: IFormDataRules[]): boolean => {
  if (!formData || typeof formData != 'object' || JSON.stringify(formData) == "{}") {
    throw new Error('表单对象不能为空');
  }
  checkRules(rules);
  return true;
}

// 校验rules参数
const checkRules = (rules: IFormDataRules[], isSubRule: boolean = false) => {
  for (let i = 0, len = rules.length; i < len; i++) {
    let obj: { [index: string]: any } = rules[i];
    if (isSubRule && Object.prototype.toString.call(obj) !== '[object Object]') {
      throw new Error('need中的每一项必须是对象');
    }

    // 校验field
    if (!('field' in obj) || isEmpty(obj.field)) {
      throw new Error('缺少 field');
    }

    // 校验name
    if (!isSubRule && (!('name' in obj) || isEmpty(obj.name))) {
      throw new Error('缺少 name');
    }

    // 校验rules
    if ('rules' in obj) {
      if (!Array.isArray(obj['rules']) && typeof (obj['rules']) != 'string' && Object.prototype.toString.call(obj['rules']) !== '[object Object]')
        throw new Error(`${isSubRule ? 'need' : 'rules'}必须是一个字符串或对象或数组`);
    }

    // 如果存在need
    if (!isSubRule && ('need' in obj)) {
      if (!Array.isArray(obj['need']) || obj['need'].length === 0) throw new Error('need必须是一个数组，且不能为空');
      checkRules(obj['need'], true);
    }
  }
  return true;
}

// 设置返回的错误
const setErrorRes = (msg: string = '', name?: string) => {
  return {
    res: false,
    msg: msg ? msg : `【${name}】格式有误`
  }
}

/**
 * 校验规则有三种
 * 1.字符串，单个校验，即默认的校验器；
 * 2.对象，单个校验；
 * 3.数组，多个校验
 */
const checkRuleType = (rules: any | any[]) => {
  if (isEmpty(rules)) {
    return '';
  } else if (typeof rules === 'string') {
    return 'string';
  } else if (Object.prototype.toString.call(rules) === '[object Object]') {
    return 'object';
  } else if (Array.isArray(rules)) {
    return 'array'
  } else {
    return ''
  }
}

const checkFileByString = (value: string, rules: string = 'isRequired') => {
  try {
    if (commonVaidatorRules.indexOf(rules) === -1) throw new Error('当前rules值不存在于校验器规则中');
    else return commonValidator[rules](value);
  } catch (error) {
    console.error(error);
  }
}

const checkFileByObj = (value: any, rules: any) => {
  const [key, val] = Object.entries(rules)[0];
  if (!(sign.includes(key))) throw new Error('当前rules值不存在于校验器规则中');
  else {
    return checkFileBySign(value, key, val);
  }
}

const checkFileBySign = (value: any, key: string, result: any) => {
  switch (key) {
    case '>': return Number(value) > Number(result);
    case '>=': return Number(value) >= Number(result);
    case '==': return value == result;
    case '===': return value === result;
    case '<': return Number(value) < Number(result);
    case '<=': return Number(value) <= Number(result);
    default: return true;
  }
}

const checkFileByArr = (value: any, rules: any): any => {
  for (let i = 0, len = rules.length; i < len; i++) {
    const rule = rules[i];
    let flag = true;
    try {
      flag = doValidate(value, rule);
      if (!flag) return false;
      if(i == len - 1) return true;
    } catch (error) {
      console.error(error);
    }
  }
}

const doValidate = (value: any, rules?: any | IFormDataRules[]) => {
  let type = checkRuleType(rules);
  switch (type) {
    case 'string': return checkFileByString(value, rules);
    case 'object': return checkFileByObj(value, rules);
    case 'array': return checkFileByArr(value, rules);
    default: return checkFileByString(value);
  }
}

// 获得表单中的值
const getValueByField = (formData: IFormData, key: string) => {
  const field = key.split('.');
  let obj = formData;
  for(let i = 0, len = field.length; i < len; i++){
    obj = getObj(obj, field[i]);
    if(!obj) return '';
  }
  return obj;
}

const getObj = (formData: IFormData, key: string) => {
  return formData[key];
}

// 校验need中的rules
const doValidateNeed = (formData: IFormData, need?: any | RulesNeed[]) => {
  for (let i = 0, len = need.length; i < len; i++) {
    const currentValue = getValueByField(formData, need[i].field);
    const rule = need[i].rules;
    let flag = doValidate(currentValue, rule);
    if (!flag) return false;
  }
  return true;
}

const validate = (formData: IFormData, rulesArr: IFormDataRules[]) => {
  if (!checkFormAndRules(formData, rulesArr)) return;
  commonValidator = validator;
  commonVaidatorRules = Object.keys(validator).filter(key => {
    return key !== 'validate'; 
  })
  try {
    for (let i = 0, len = rulesArr.length; i < len; i++) {
      const { field, name, rules, need, tip } = rulesArr[i];
      const currentValue = getValueByField(formData, field);
      let flag = true;
      // 值为空，且没有need
      if (isEmpty(currentValue) && !need) {
        if(rules != 'isEmpty') return setErrorRes(tip, name);
        // 值为空，但有need
      } else if (isEmpty(currentValue) && need) {
        const t = doValidateNeed(formData, need);
        if (t && rules != 'isEmpty') return setErrorRes(tip, name);
        // 有值，但没有rules,即isRequired
      } else if (!isEmpty(currentValue) && !rules) {
        flag = doValidate(currentValue);
        if (!flag) return setErrorRes(tip, name);
        // 有值有need, 在判断有无rules
      } else {
        let needVaidtate = true;
        // 是否有need
        if (need) {
          // need校验是否通过
          needVaidtate = doValidateNeed(formData, need);
          // 如果通过再校验当前的值
          if (needVaidtate) {
            flag = doValidate(currentValue, rules);
            if (!flag) return setErrorRes(tip, name);
          }
        } else {
          flag = doValidate(currentValue, rules);
          if (!flag) return setErrorRes(tip, name);
        }
      }
    }
    return {
      res: true,
      msg: 'success'
    }
  } catch (error) {
    console.error(error);
    return setErrorRes('校验器出错~');
  }
}

export default validate;
