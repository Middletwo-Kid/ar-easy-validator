import hook from './rule';

function Validator(){
  const self = this;

  Object.keys(hook.regex).forEach(key => {
    key = camelCase(key);
    self[key] = hook[key];
    self.isRequired = hook.isRequired;
    self.isEmpty = hook.isEmpty;
    self.isIdcard = hook.isIdcard;
  })
};

Validator.prototype.validate = (formData, rule) => {
  Object.keys(formData).forEach((key) => {
    const val = formData[key];
  })
}

function camelCase(str){
  let newArr = str.split('_');
  const lastKey = ('' + newArr[1]).charAt(0).toUpperCase() + newArr[1].slice(1);
  return newArr[0] + lastKey;
}

export default Validator;