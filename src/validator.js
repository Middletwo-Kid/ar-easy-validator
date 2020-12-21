import hook from './rule';
const sign = ['>', '>=', '==', '<', '<=', '!=', '!=='];

function Validator(){
  const self = this;

  // 挂载校验方法
  Object.keys(hook).forEach(key => {
    self[key] = hook[key];
  });
};

// 新增校验方法
Validator.prototype.addRules = (validateMethod, fn) => {
  // 校验名字是否合法
  if(typeof validateMethod !== 'string' || validateMethod in hook || validateMethod === 'addRules') {
    console.error("Method's name is invaild");
    return;
  }

  // 校验方法是否合法
  if(typeof fn !== 'function'){
    console.error("fn is invaild");
    return;
  }

  Validator.prototype[validateMethod] = fn;
}

// 校验表单
Validator.prototype.validate = (formData, rules) => {
  // 参数和校验规则都必须为对象
  if(!(formData instanceof Object) || !(rules instanceof Object)) {
    console.error(`method validate's args should be Object`);
    return false;
  } else if(!hook.isEmpty(rules) && hook.isEmpty(formData)) {
    // 如果校验规则不为空，但是对象为空，直接返回false
    return false
  };  

  const ruleArr = formateRules(rules);

  for(let i = 0 ; i < ruleArr.length; i++) {
    const item = ruleArr[i];
    if(!(item.field in formData)) {
      // 如果这个key不存在formData, 跳过校验
      continue;
    } else {
      let flag;
      const value = formData[item.field];
      const { field, rule, need: needRules, tip } = item;

      if(needRules){
        // 有前置条件，如果通过才进行下一步校验，否则跳过这次的校验    
        
        // need中的rules不符合规范，直接返回false
        if(!(checkNeed(needRules))) return false;
        
        const needRuleArr = formateNeedRules(needRules);
        let needFlag = true;

        for(let j = 0 ; j < needRuleArr.length; j ++ ){
          const needItem = needRuleArr[j];
          if(!needItem.field){
            throw new Error('The lack of field in need \'s rule');
          }
          const needValue = formData[needItem.field];
          const needRule = needItem.rule;
          needFlag = checkRule(needValue, needRule);

          if(!needFlag) {
            break;
          }
        }

        if(needFlag) {
          flag = checkRule(value, rule, tip);
          if(!flag) return throwResult(flag, field);
        }else {
          // 跳出此次循环
          continue;
        }
      }else {
        // 当没有前置条件的时候，直接判断是否校验成功
        flag = checkRule(value, rule, tip);
        if(!flag) return throwResult(flag, field);
      }
    }
  }

  return true;
}

const throwResult = (flag, field) => {
  if(!flag) {
    console.error(`${field} is error`);
    return false;
  }else {
    return true;
  }
}

// 格式化rules
const formateRules = (rules) => {
  const arr =  Object.keys(rules).map(key => {
    let obj = JSON.parse(JSON.stringify(rules[key]));
    if(obj && obj instanceof Object && hook.isEmpty(obj.rule)) obj.rule = 'isRequired';
    else if(typeof obj === 'string') {
      throw new Error('rule is invalid');
    }
    if(!('field' in obj)) obj.field = key;
    return obj;
  });

  return JSON.parse(JSON.stringify(arr));
}

const formateNeedRules = (rules) => {
  return rules.map(item => {
    const rule = item.rule;
    if(hook.isEmpty(rule)) item.rule = 'isRequired';
    for(let i = 0; i < rule.length; i++){
      if(typeof rule[i] === 'string' && !(rule[i] in hook)) item.rule[i] = 'isRequired';
    }
    return item;
  })
}

const checkRule = (value, rule, canBeArray = true) => {
  let type = '';

  if(typeof rule === 'string'){
    // { rule: 'isRequired' }
    type = 'string';
  }else if(canBeArray && Array.isArray(rule)){
    // { rule: ['isRequired', 'isEmail' ]}
    type = 'array';
  }else if(Object.prototype.toString.call(rule) == '[object Object]') {
    // { rule: {'==': 3}}
    type = 'object';
  }else {
    console.error('rule is invalid');
    return false;
  }

  let flag = false;
  switch(type){
    case 'object': flag = validateObjectRule(value, rule); break;
    case 'array': flag = validateArrayRule(value, rule); break;
    default: flag = validateStringRule(value, rule); break;
  }

  return flag;
}

const checkNeed = (rules) => {
  if(!Array.isArray(rules) || ((Array.isArray(rules) && rules.length === 0))){
    console.error('need is invalid');
    return false;
  }

  return true;
}

const validateStringRule = (value, rule) => {
  if(!(rule in hook)) {
    console.error('rule is invalid');
    return false;
  }

  let flag = true;
  if(rule !== 'isRequired'){
    flag = hook.isRequired(value);   
  }

  return flag && hook[rule](value);
}

const validateObjectRule = (value, rule) => {
  const key = Object.keys(rule)[0];
  if(!(sign.includes(key) > -1)) {
    console.error('rule is invalid');
    return false;
  }
  const val = rule[key];

  switch (key) {
    case '>': return (+value) > (+val);
    case '>=': return (+value) >= (+val);
    case '==': return value == val;
    case '===': return value === val;
    case '<': return (+value) < (+val);
    case '<=': return (+value) <= (+val);
    case '!=': return value != val;
    case '!==': return value !== val;
    default: return false;
  }
}

const validateArrayRule = (value, rules) => {
  for(let i = 0; i < rules.length; i++){
    const rule = rules[i];
    let flag = checkRule(value, rule, false);
    if(!flag) return false;
  }
  return true;
}

export default Validator;