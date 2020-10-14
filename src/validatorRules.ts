export const isRequired = (str: any) => str != undefined && String(str).length > 0;
export const isEmpty = (str: any) =>  str == null || str === '' || (Array.isArray(str) && str.length == 0) || typeof str == 'undefined' || JSON.stringify(str) == '{}';
export const isName = (str: any) => str != undefined && /^[\u4E00-\u9FA5]{2,4}$/.test(str);
export const isNumber = (str: any) => str != undefined && /^[0-9]*$/.test(str);
export const isPhone = (str: any) => str != undefined && /^1[3456789][0-9]{9}$/.test(str);
export const isCode = (str: any) => str != undefined && /^[0-9]{6}$/.test(str);
export const isBankcard = (str: any) => str != undefined && /^[0-9]{16,19}$/.test(str);
export const isIdcard = (code: any) => {
  let city: {[index: number]: string} ={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
  let pass: boolean = true;
  let msg: string = "验证成功";
  //验证身份证格式（6个地区编码，8位出生日期，3位顺序号，1位校验位）
  if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(code)){
    pass=false;
    msg = "身份证号格式错误";
  }else if(!city[code.substr(0,2)]){
    pass=false;
    msg = "身份证号地址编码错误";
  }else{
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
        msg = "身份证号校验位错误";
      }
    }
    return code != undefined && pass ;
  }
};
export const isAge = (str: any) => str != undefined && /^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(str);
export const isWx = (str: any) => str != undefined && ((/^1[3456789][0-9]{9}$/.test(str) || /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/.test(str)));
export const isMoney = (str: any) => str != undefined && /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/.test(str);
export const isMoneyNotLimit = (money: string): boolean => /((^[1-9]\d*)|^0)(\.\d*){0,1}$/.test(money);
export const isEmail = (str: any) => str != undefined && /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(str);