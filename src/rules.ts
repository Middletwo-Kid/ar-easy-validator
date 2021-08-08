import { CITY } from './constanst';

export type RegexKey = 'is_email' | 'is_mobile' | 'is_concat' | 'is_name' | 'is_number'
                | 'is_bankcard' | 'is_age' | 'is_money' | 'is_positive_int' 
                | 'is_chinese' | 'is_english' | 'is_url' | 'is_id';
export type Regex = { [K in RegexKey]: RegExp };

const regex: Regex = {
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
}

const isEmpty = (val: any) => {
  const type = typeof val;

  if((type === 'undefined')
    || (type === 'string' && val.length === 0)
    || (type === 'object' && !val)
    || (type === 'object' && Array.isArray(val) && val.length === 0)
    || (type === 'object' && Object.keys(val).length === 0)) return true;

  return false;
}

const is = (x: any, y: any) => {
  // 要区分0、 +0、-0和NaN的情况
  if(x === y){
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

export const isEqual = (x: any, y: any) => {
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
}

const isRequired = (val: any) => !isEmpty(val);
const isEmail = (val: any) => regex.is_email.test(val);
const isMobile = (val: any) => regex.is_mobile.test(val);
const isConcat = (val: any) => regex.is_concat.test(val);
const isWx = (val: any) => regex.is_mobile.test(val) || /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/.test(val);
const isName = (val: any) => regex.is_name.test(val);
const isNumber = (val: any) => regex.is_number.test(val);
const isPositiveInt = (val: any) => regex.is_positive_int.test(val);
const isBankcard = (val: any) => regex.is_bankcard.test(val);
const isAge = (val: any) => regex.is_age.test(val);
const isMoney = (val: any) => regex.is_money.test(val);
const isChinese = (val: any) => regex.is_chinese.test(val);
const isEnglish = (val: any) => isRequired(val) && regex.is_english.test(val);
const isUrl = (val: any) => regex.is_url.test(val);
const isIdcard = (code: any) => {
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
  isPositiveInt,
  isBankcard,
  isAge,
  isMoney,
  isChinese,
  isEnglish,
  isUrl,
  isIdcard
};
