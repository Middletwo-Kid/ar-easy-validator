import hook from './rule';
const sign = ['>', '>=', '==', '<', '<='];

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
Validator.prototype.validate = (formData, rule) => {
  Object.keys(formData).forEach((key) => {
    const val = formData[key];
  })
}

export default Validator;