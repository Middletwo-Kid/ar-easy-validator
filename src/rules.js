import { CITY } from './constanst';

const regex = {
  is_email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
  is_mobile: /^1[3456789][0-9]{9}$/,
  is_concat: /(^(\d{3,4}-)?\d{6,8}$)|(^1[3456789][0-9]{9}$)/,
  is_name: /^[\u4E00-\u9FA5]{2,4}$/,
  is_number: /^[0-9]+$/,
  is_code: /^[0-9]{6}$/,
  is_bankcard: /^[0-9]{16,19}$/,
  is_age: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
  is_money: /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/,
  is_int: /^-?[1-9]\d*$/,
  is_chinese: /^[\u4E00-\u9FA5]+$/,
  is_english: /^[A-Za-z]+$/,
  is_url: /[a-zA-z]+:\/\/[^\s]/,
  is_id: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
}

const isEmpty = (val) => {
  const type = typeof val;

  if((type === 'undefined')
    || (type === 'string' && val.length === 0)
    || (type === 'object' && !val)
    || (type === 'object' && Array.isArray(val) && val.length === 0)
    || (type === 'object' && Object.keys(val).length === 0)) return true;

  return false;
}

const is = (x, y) => {
  // 要区分0、 +0、-0和NaN的情况
  if(x === y){
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

export const isEqual = (x, y) => {
  if(is(x, y)) return true;

  if(typeof x !== 'object'
    || x === null
    || y !== 'object'
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
}

const isRequired = (val) => !isEmpty(val);
const isEmail = (val) => regex.is_email.test(val);
const isMobile = (val) => regex.is_mobile.test(val);
const isConcat = (val) => regex.is_concat.test(val);
const isWx = (val) => regex.is_mobile.test(val) || /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(val);
const isName = (val) => regex.is_name.test(val);
const isNumber = (val) => regex.is_number.test(val);
const isInt = (val) => regex.is_int.test(val);
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
  }else{
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

export default {
  isRequired,
  isEmpty,
  isEqual,
  isEmail,
  isMobile,
  isConcat,
  isWx,
  isName,
  isNumber,
  isInt,
  isBankcard,
  isAge,
  isMoney,
  isChinese,
  isEnglish,
  isUrl,
  isIdcard
};
