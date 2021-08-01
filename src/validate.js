
const checkIsObject = (values) => {
  return typeof values !== 'object' && Object.prototype.toString.call(values) !== '[object Object]';
}

const checkParameter = (values, rules) => {
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

const checkRule = (field, rules, need, tip) => {
  try {
    if(!field){
      throw new Error(`field is invaild in rules's item`);
    }

    const type = typeof rules;

    if(type !== 'string' || !checkIsObject(rules) || !Array.isArray(rules)){
      throw new Error(`rules is invaild in rules's item`);
    }

    // 如果string 需要判断是否存在
    // 如果object, 
    // 如果是数组， 遍历判断内部

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
      checkRule(field, rules, need, tip);

      if(Object.prototype.hasOwnProperty(field)){
        checkValue(values[field], rules, need, tip);
      }
      
    } catch (error) {
      console.error(error);
    }
  }
}

export default validate;
