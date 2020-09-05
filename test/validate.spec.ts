import validate from '../src/validate';

const rule0 = [
  {field: 'test', name: '测试'}
]

describe('examples', () => {
  it('缺少必填项', () => {
    expect(validate({test: ''}, rule0)).toStrictEqual({"res": false, "msg": '【测试】格式有误'});
  })
})

describe('examples', () => {
  it('有必填项', () => {
    expect(validate({test: '测试'}, rule0)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

const rule1 = [
  {field: 'name', name: '姓名', rules: 'isName'}
]

describe('examples', () => {
  it('缺少姓名', () => {
    expect(validate({name: ''}, rule1)).toStrictEqual({"res": false, "msg": '【姓名】格式有误'});
  })
})

describe('examples', () => {
  it('错误姓名', () => {
    expect(validate({name: '123'}, rule1)).toStrictEqual({"res": false, "msg": '【姓名】格式有误'});
  })
})

describe('examples', () => {
  it('正确姓名', () => {
    expect(validate({name: '隔壁老王'}, rule1)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

const rule2 = [
  {field: 'phone', name: '电话', rules: 'isPhone'}
]

describe('examples', () => {
  it('缺少电话', () => {
    expect(validate({phone: ''}, rule2)).toStrictEqual({"res": false, "msg": '【电话】格式有误'});
  })
})

describe('examples', () => {
  it('错误电话', () => {
    expect(validate({phone: '123'}, rule2)).toStrictEqual({"res": false, "msg": '【电话】格式有误'});
  })
})

describe('examples', () => {
  it('正确电话', () => {
    expect(validate({phone: '13800138000'}, rule2)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

const rule3 = [
  {field: 'v_code', name: '验证码', rules: 'isCode'}
]

describe('examples', () => {
  it('缺少验证码', () => {
    expect(validate({v_code: ''}, rule3)).toStrictEqual({"res": false, "msg": '【验证码】格式有误'});
  })
})

describe('examples', () => {
  it('错误验证码', () => {
    expect(validate({v_code: '123'}, rule3)).toStrictEqual({"res": false, "msg": '【验证码】格式有误'});
  })
})

describe('examples', () => {
  it('正确验证码', () => {
    expect(validate({v_code: '132456'}, rule3)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

const rule4 = [
  {field: 'bankcard', name: '银行卡', rules: 'isBankcard'}
]

describe('examples', () => {
  it('缺少银行卡', () => {
    expect(validate({bankcard: ''}, rule4)).toStrictEqual({"res": false, "msg": '【银行卡】格式有误'});
  })
})

describe('examples', () => {
  it('错误银行卡', () => {
    expect(validate({bankcard: '123'}, rule4)).toStrictEqual({"res": false, "msg": '【银行卡】格式有误'});
  })
})

describe('examples', () => {
  it('正确银行卡', () => {
    expect(validate({bankcard: '3301040160000852007'}, rule4)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

const rule5 = [
  {field: 'idcard', name: '身份证', rules: 'isIdcard'}
]

describe('examples', () => {
  it('缺少身份证', () => {
    expect(validate({idcard: ''}, rule5)).toStrictEqual({"res": false, "msg": '【身份证】格式有误'});
  })
})

describe('examples', () => {
  it('错误身份证', () => {
    expect(validate({idcard: '3301040160000852007'}, rule5)).toStrictEqual({"res": false, "msg": '【身份证】格式有误'});
  })
})

describe('examples', () => {
  it('正确身份证', () => {
    expect(validate({idcard: '110101199003079198'}, rule5)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

const rule6 = [
  {field: 'age', name: '年龄', rules: 'isAge'}
]

describe('examples', () => {
  it('缺少年龄', () => {
    expect(validate({age: ''}, rule6)).toStrictEqual({"res": false, "msg": '【年龄】格式有误'});
  })
})

describe('examples', () => {
  it('错误年龄', () => {
    expect(validate({age: 1111}, rule6)).toStrictEqual({"res": false, "msg": '【年龄】格式有误'});
  })
})

describe('examples', () => {
  it('正确年龄', () => {
    expect(validate({age: 10}, rule6)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

const rule7 = [
  {field: 'wx', name: '微信', rules: 'isWx'}
]

describe('examples', () => {
  it('缺少微信', () => {
    expect(validate({wx: ''}, rule7)).toStrictEqual({"res": false, "msg": '【微信】格式有误'});
  })
})

describe('examples', () => {
  it('错误微信', () => {
    expect(validate({wx: 1111}, rule7)).toStrictEqual({"res": false, "msg": '【微信】格式有误'});
  })
})

describe('examples', () => {
  it('正确微信(微信号）', () => {
    expect(validate({wx: 'zhuz36514854'}, rule7)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

describe('examples', () => {
  it('正确微信（手机号）', () => {
    expect(validate({wx: 13800138000}, rule7)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

const rule8 = [
  {field: 'money', name: '金额', rules: 'isMoney'}
]

describe('examples', () => {
  it('缺少金额', () => {
    expect(validate({money: ''}, rule8)).toStrictEqual({"res": false, "msg": '【金额】格式有误'});
  })
})

describe('examples', () => {
  it('错误金额', () => {
    expect(validate({money: '11.1.1'}, rule8)).toStrictEqual({"res": false, "msg": '【金额】格式有误'});
  })
})

describe('examples', () => {
  it('正确金额(字符串自动转)', () => {
    expect(validate({money: '10'}, rule8)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

describe('examples', () => {
  it('正确金额', () => {
    expect(validate({money: 10}, rule8)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

const rule9 = [
  {field: 'email', name: '邮箱', rules: 'isEmail'}
]

describe('examples', () => {
  it('缺少邮箱', () => {
    expect(validate({email: ''}, rule9)).toStrictEqual({"res": false, "msg": '【邮箱】格式有误'});
  })
})

describe('examples', () => {
  it('错误邮箱', () => {
    expect(validate({email: '@qq.com'}, rule9)).toStrictEqual({"res": false, "msg": '【邮箱】格式有误'});
  })
})

describe('examples', () => {
  it('正确邮箱', () => {
    expect(validate({email: 'test@qq.com'}, rule9)).toStrictEqual({"res": true, "msg": 'success'});
  })
})


const rule10 = [
  {field: 'email', name: '空', rules: 'isEmpty'}
]

describe('examples', () => {
  it('空为空字符串', () => {
    expect(validate({email: ''}, rule10)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

describe('examples', () => {
  it('空为0', () => {
    expect(validate({email: 0}, rule10)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

describe('examples', () => {
  it('空为{}', () => {
    expect(validate({email: {}}, rule10)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

describe('examples', () => {
  it('空为[]', () => {
    expect(validate({email: []}, rule10)).toStrictEqual({"res": true, "msg": 'success'});
  })
})

describe('examples', () => {
  it('空为"0"', () => {
    expect(validate({email: "0"}, rule10)).toStrictEqual({"res": false, "msg": '【空】格式有误'});
  })
})

describe('examples', () => {
  it('空为1', () => {
    expect(validate({email: 1}, rule10)).toStrictEqual({"res": false, "msg": '【空】格式有误'});
  })
})