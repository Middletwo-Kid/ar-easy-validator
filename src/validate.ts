import { IFormData, IFormDataRules } from './type';
import * as validatorRules from './validatorRules';
const sign = ['>', '>=', '==', '===', '<', '<='];

const commonVaidatorRules: IFormData = validatorRules;

// 是否为空
const isEmpty = (value: any) => {
  return value == null || value === '';
}

// 校验函数的参数
const checkFormAndRules = (formData: IFormData, rules: IFormDataRules[]): boolean => {
  try {
    if(!formData || typeof formData != 'object'){
      throw new Error('表单对象不能为空');
    }
    checkRules(rules);
  } catch (error) {
    console.error(error);
    return false;
  }
  return true;
}

// 校验rules参数
const checkRules = (rules: IFormDataRules[], isSubRule: boolean = false) => {
  if(!Array.isArray(rules)) {
    throw new Error(`${isSubRule? 'need' : 'rules'}校验规则必须为数组`);
  }
  for(let i = 0, len = rules.length; i < len; i++){
    let obj:{[index: string] : any} = rules[i];
    if(isSubRule && Object.prototype.toString.call(obj) !== '[object Object]' ) {
      throw new Error('need中的每一项必须是对象');
    }
    if(!('field' in obj) || isEmpty(obj.field)) {
      throw new Error('缺少 field');
    }
    if(!isSubRule && (!('name' in obj) || isEmpty(obj.name))) {
      throw new Error('缺少 name');
    }
    if(isSubRule && !('rules' in obj) ) {
      throw new Error('need中的每一项必须存在 rules');
    }
    if('rules' in obj) {
      if(!Array.isArray(obj['rules']) && typeof(obj['rules']) !='string' && Object.prototype.toString.call(obj['rules']) !== '[object Object]')
      throw new Error(`${isSubRule? 'need' : 'rules'}必须是一个字符串或对象或数组`);
    }
    if(!isSubRule && ('need' in obj)) {
      checkRules(obj['need'], true)
    }
  }
  return true;
}

// 设置返回的错误
const setErrorRes = (msg: string = '', name?: string) => {
  return {
    res: false,
    msg: msg ? msg : `【${name}】为空或格式不对`
  }
}

/**
 * 校验规则有三种
 * 1.字符串，单个校验，即默认的校验器；
 * 2.对象，单个校验；
 * 3.数组，多个校验
 */
 const checkRuleType = (rules: any|any[]) => {
  if(isEmpty(rules)){
    return '';
  }else if(typeof rules === 'string'){
    return 'string';
  }else if(Object.prototype.toString.call(rules) === '[object Object]'){
      return 'object';
  }else if(Array.isArray(rules)){
      return 'array'
  }else {
    return ''
  }
 }

const checkFileByString = (value: string, rules: string = 'isRequired') => {
  try {
    if(!(rules in commonVaidatorRules)) throw new Error('当前rules值不存在于校验器规则中');
    else return commonVaidatorRules[rules](value);
  } catch (error) {
    console.error(error);
  }
}

const checkFileByObj = (value: any, rules: any) => {
   const [key, val] = Object.entries(rules)[0];
   try {
      if(!(sign.includes(key))) throw new Error('当前rules值不存在于校验器规则中');
      else return checkFileBySign(value, key, val);
    } catch (error) {
      console.error(error);
    }
}

const checkFileBySign = (value: any, key: string, result: any) => {
  switch(key){
    case '>' : return Number(value) > Number(result);
    case '>=' : return Number(value) >= Number(result);
    case '==' : return value == result;
    case '===' : return value === result;
    case '<' : return Number(value) < Number(result);
    case '<=' : return Number(value) <= Number(result);
    default: return true;
  }
}

const checkFileByArr = (value: any, rules: any) => {
   
}

const doValidate = (value: any, rules?: any | IFormDataRules[]) => {
  let type = checkRuleType(rules);
  console.log('type', type);
  switch(type){
    case 'string': return checkFileByString(value, rules);
    case 'object': return checkFileByObj(value, rules);
    case 'array': return checkFileByArr(value, rules);
    default: return checkFileByString(value);
  }
}

const validate = (formData: IFormData, rulesArr: IFormDataRules[]) => {
  if(!checkFormAndRules(formData, rulesArr)) return;
  for(let i = 0, len = rulesArr.length; i < len; i++){
    const { field, name, rules, need, tip } = rulesArr[i];
    console.log(field, name, rules, need, tip);
    const currentValue = formData[field];
    let flag = true;
    // 值为空，且没有need
    if(isEmpty(currentValue) && !need){
      console.log('值为空，且没有need');
      return setErrorRes(tip, name);
    // 值为空，但有need
    }else if(isEmpty(currentValue) && need){
      console.log('值为空，但有need');
    // 有值，但没有rules
    }else if(!isEmpty(currentValue) && !rules){
      console.log('有值，但没有rules');
      flag = doValidate(currentValue);
      if(!flag) return setErrorRes(tip, name);
    // 有值有need, 在判断有无rules
    }else{
      console.log('else');
      flag =(doValidate(currentValue, rules));
      if(!flag) return setErrorRes(tip, name);
    }
  }
}

export default validate;