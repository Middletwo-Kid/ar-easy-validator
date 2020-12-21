(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Validator = factory());
}(this, (function () { 'use strict';

  const regex = {
    is_email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    is_phone: /^1[3456789][0-9]{9}$/,
    is_name: /^[\u4E00-\u9FA5]{2,4}$/,
    is_number: /^[0-9]+$/,
    is_code: /^[0-9]{6}$/,
    is_banckcard: /^[0-9]{16,19}$/,
    is_age: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
    is_money: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
    is_moneyNotLimt: /((^[1-9]\d*)|^0)(\.\d*){0,1}$/,
    is_chinese: /^[\u4E00-\u9FA5]+$/,
    is_english: /^[A-Za-z]+$/,
    is_url: /[a-zA-z]+:\/\/[^\s]/,
    is_fax: /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/,
    is_ip: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])((\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}|(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){5})$/,
  };

  const isEmpty = (val) => {
    // 考虑 0 {}的情况
    if((val instanceof Object && Object.keys(val).length === 0)){
      return true;
    }else if(typeof val === "number" && val === 0){
      return false;
    }else if(!val){
      return true;
    }else {
      return false;
    }
  };
  const isRequired = (val) => !isEmpty(val);
  const isEmail = (val) => regex.is_email.test(val);
  const isPhone = (val) => regex.is_phone.test(val);
  const isName = (val) => regex.is_name.test(val);
  const isNumber = (val) => regex.is_number.test(val);
  const isCode = (val) => regex.is_code.test(val);
  const isBanckcard = (val) => regex.is_banckcard.test(val);
  const isAge = (val) => regex.is_age.test(val);
  const isMoney = (val) => regex.is_money.test(val);
  const isMoneyNotLimt = (val) => regex.is_moneyNotLimt.test(val);
  const isChinese = (val) => regex.is_chinese.test(val);
  const isEnglish = (val) => isRequired(val) && regex.is_english.test(val);
  const isUrl = (val) => regex.is_url.test(val);
  const isFax = (val) => regex.is_fax.test(val);
  const isIp = (val) => regex.is_ip.test(val);
  const isIdcard = (code) => {
    let city ={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    let pass = true;
    //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)){
      return false;
    }else if(!city[code.substr(0,2)]){
      return false;
    }else {
      //18位身份证需要验证最后一位校验位
      if(code.length == 18){
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
        //校验位
        let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
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

  var hook = {
    isRequired,
    isEmpty,
    isEmail,
    isPhone,
    isName,
    isNumber,
    isCode,
    isBanckcard,
    isAge,
    isMoney,
    isMoneyNotLimt,
    isChinese,
    isEnglish,
    isUrl,
    isFax,
    isIp,
    isIdcard
  };

  const sign = ['>', '>=', '==', '<', '<=', '!=', '!=='];

  function Validator(){
    const self = this;

    // 挂载校验方法
    Object.keys(hook).forEach(key => {
      self[key] = hook[key];
    });
  }
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
  };

  // 校验表单
  Validator.prototype.validate = (formData, rules) => {
    // 参数和校验规则都必须为对象
    if(!(formData instanceof Object) || !(rules instanceof Object)) {
      console.error(`method validate's args should be Object`);
      return false;
    } else if(!hook.isEmpty(rules) && hook.isEmpty(formData)) {
      // 如果校验规则不为空，但是对象为空，直接返回false
      return false
    }
    const ruleArr = formateRules(rules);

    for(let i = 0 ; i < ruleArr.length; i++) {
      console.log('ruleArr[i]', ruleArr[i]);
      const item = ruleArr[i];
      // console.log('item.field', item.field);
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
          console.log('checkNeed(needRules)', checkNeed(needRules), needRules);
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
  };

  const throwResult = (flag, field) => {
    if(!flag) {
      console.error(`${field} is error`);
      return false;
    }else {
      return true;
    }
  };

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
  };

  const formateNeedRules = (rules) => {
    return rules.map(item => {
      const rule = item.rule;
      if(hook.isEmpty(rule)) item.rule = 'isRequired';
      for(let i = 0; i < rule.length; i++){
        if(typeof rule[i] === 'string' && !(rule[i] in hook)) item.rule[i] = 'isRequired';
      }
      return item;
    })
  };

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
  };

  const checkNeed = (rules) => {
    if(!Array.isArray(rules) || ((Array.isArray(rules) && rules.length === 0))){
      console.error('need is invalid');
      return false;
    }

    return true;
  };

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
  };

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
  };

  const validateArrayRule = (value, rules) => {
    for(let i = 0; i < rules.length; i++){
      const rule = rules[i];
      let flag = checkRule(value, rule, false);
      if(!flag) return false;
    }
    return true;
  };

  return Validator;

})));
