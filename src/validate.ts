import { FormData, FormDataRules} from './type';
const validate = (formData: FormData, rules: FormDataRules[]) => {
  if(!checkFormAndRules(formData, rules)) return;
  console.log('-------------------');
}

// 校验fromData和rules
const checkFormAndRules = (formData: FormData, rules: FormDataRules[]): boolean => {
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

const checkRules = (rules: FormDataRules[], isSubRule: boolean = false) => {
  if(!Array.isArray(rules)) {
    throw new Error(`${isSubRule? 'need' : 'rules'}校验规则必须为数组`);
  }
  for(let i = 0, len = rules.length; i < len; i++){
    let obj:{[index: string] : any} = rules[i];
    if(isSubRule && Object.prototype.toString.call(obj) !== '[object Object]' ) {
      throw new Error('need中的每一项必须是对象');
    }
    if(!('field' in obj)) {
      throw new Error('缺少 field');
    }
    if(!isSubRule && !('name' in obj)) {
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

export default validate;