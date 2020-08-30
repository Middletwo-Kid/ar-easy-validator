import { validator } from '../index';

describe('测试need,当有need的时候才校验name', () => {
  const rule: any[] = [
    {field: 'name', name: '姓名', rules: 'isName', need: [{field: 'test'}]}
  ]
  it('name为空,test为空', () => {
    expect(validator.validate({name: '', test: ''}, rule)).toStrictEqual({"res": true, "msg": 'success'});
  });

  it('错误的name,test为空', () => {
    expect(validator.validate({name: '123', test: ''}, rule)).toStrictEqual({"res": true, "msg": 'success'});
  });

  it('错误的name,test为空', () => {
    expect(validator.validate({name: '123', test: []}, rule)).toStrictEqual({"res": true, "msg": 'success'});
  });

  it('name为空,test有值', () => {
    expect(validator.validate({name: '', test: '123'}, rule)).toStrictEqual({"res": false, "msg": '【姓名】格式有误'});
  });

  it('错误的name,test有值', () => {
    expect(validator.validate({name: '123', test: '123'}, rule)).toStrictEqual({"res": false, "msg": '【姓名】格式有误'});
  });

  it('正确的name,test有值', () => {
    expect(validator.validate({name: '王思聪', test: '123'}, rule)).toStrictEqual({"res": true, "msg": 'success'});
  });
});

describe('测试自定义校验器', () => {
  validator.addRules('isInArray', (str: any) => {
    return [1,2,3,4,5,6,7,8,9,0].indexOf(str) > -1;
  })
  const rule: any[] = [
    {field: 'money1', name: '金额1', rules: 'isInArray'},
    {field: 'money2', name: '金额2', rules: ['isMoney', 'isInArray', {'>': 2}]},
    {field: 'name', name: '姓名', rules: 'isName', need: [{field: 'money1', rules: 'isInArray'}]}
  ]

  it('money1为空', () => {
    expect(validator.validate({money1: ''}, rule)).toStrictEqual({"res": false, "msg": '【金额1】格式有误'});
  });

  it('money1错误', () => {
    expect(validator.validate({money1: '11'}, rule)).toStrictEqual({"res": false, "msg": '【金额1】格式有误'});
  });

  it('money1正确，money2和name都为空', () => {
    expect(validator.validate({money1: 1}, rule)).toStrictEqual({"res": false, "msg": '【金额2】格式有误'});
  });

  it('都正确', () => {
    expect(validator.validate({money1: 1, money2: 3, name: '王思聪'}, rule)).toStrictEqual({"res": true, "msg": 'success'});
  });

  it('money1正确， money2错误', () => {
    expect(validator.validate({money1: 1, money2: 100, name: '王思聪'}, rule)).toStrictEqual({"res": false, "msg": '【金额2】格式有误'});
  });

  it('money1正确， money2正确，name错误', () => {
    expect(validator.validate({money1: 1, money2: 3, name: '123'}, rule)).toStrictEqual({"res": false, "msg": '【姓名】格式有误'});
  });
})
