import validator from '../src/index';

// rule = [
//   { field: 'name' },
//   { field: 'name', rules: 'isRequired'},
//   { field: 'name', rules: 'isName'},

//   { field: 'age', rules: 'isAge'},
//   { field: 'age', rules: {'>' : 18}},
//   { field: 'age', rules: {'>=' : 18}},
//   { field: 'age', rules: {'==' : 18}},
//   { field: 'age', rules: {'===' : 18}},
//   { field: 'age', rules: {'<=' : 18}},
//   { field: 'age', rules: {'<' : 18}},

//   { field: 'content', rules: { '<=' : 10 } },
//   { field: 'options', rules: { '<=' : 3 } },
// ]

describe('test parameter', () => {
  it('参数values不是object', () => {
    expect(validator.validate(undefined, undefined)).toEqual({msg: "failure", res: false});
  });

  it('参数rules不是array', () => {
    expect(validator.validate({}, undefined)).toEqual({msg: "failure", res: false});
  });
})

describe('test isRequired', () => {
  it('rules中的field不是字符串', () => {
    expect(validator.validate({}, [{field: {}}])).toEqual({msg: "failure", res: false});
  });

  it('name必填，当此时为空', () => {
    expect(validator.validate({name: ''}, [{field: 'name'}])).toEqual({msg: "name is error", res: false});
  });

  it('name必填，当此时为王花花', () => {
    expect(validator.validate({name: '王花花'}, [{field: 'name'}])).toEqual({msg: "success", res: true});
  });

  it('name必填，当此时为空', () => {
    expect(validator.validate({name: ''}, [{field: 'name', rules: 'isRequired'}])).toEqual({msg: "name is error", res: false});
  });

  it('name必须符合isName，当此时为王花花', () => {
    expect(validator.validate({name: '王花花'}, [{field: 'name', rules: 'isRequired'}])).toEqual({msg: "success", res: true});
  });
})

describe('test string rules', () => {
  it('当字符串校验规则不存在时', () => {
    expect(validator.validate({name: '王花花'}, [{field: 'name', rules: 'isTest'}])).toEqual({msg: "failure", res: false});
  });

  it('name必须符合isName，当此时为王花花', () => {
    expect(validator.validate({name: '王花花'}, [{field: 'name', rules: 'isName'}])).toEqual({msg: "success", res: true});
  });

  it('name必须符合isName，当此时为王花花123', () => {
    expect(validator.validate({name: '王花花123'}, [{field: 'name', rules: 'isName'}])).toEqual({msg: "name is error", res: false});
  });
})

describe('test object rules', () => {
  it('当对象校验规则不存在时', () => {
    expect(validator.validate({age: 18}, [{field: 'age', rules: {'?': 18}}])).toEqual({msg: "failure", res: false});
  });

  it('age必须大于18，当此时为17', () => {
    expect(validator.validate({age: '17'}, [{field: 'age', rules: {'>': 18}}])).toEqual({msg: "age is error", res: false});
  });

  it('age必须大于18，当此时为19', () => {
    expect(validator.validate({age: '19'}, [{field: 'age', rules: {'>': 18}}])).toEqual({msg: "success", res: true});
  });

  it('age必须大于等于18，当此时为17', () => {
    expect(validator.validate({age: '17'}, [{field: 'age', rules: {'>=': 18}}])).toEqual({msg: "age is error", res: false});
  });

  it('age必须大于等于18，当此时为18', () => {
    expect(validator.validate({age: '18'}, [{field: 'age', rules: {'>=': 18}}])).toEqual({msg: "success", res: true});
  });

  it('age必须等于18，当此时为18', () => {
    expect(validator.validate({age: '18'}, [{field: 'age', rules: {'==': 18}}])).toEqual({msg: "success", res: true});
  });

  it('age必须等于18，当此时为"18"', () => {
    expect(validator.validate({age: '18'}, [{field: 'age', rules: {'===': 18}}])).toEqual({msg: "age is error", res: false});
  });

  it('age必须等于18，当此时为18', () => {
    expect(validator.validate({age: 18}, [{field: 'age', rules: {'===': 18}}])).toEqual({msg: "success", res: true});
  });

  it('age必须等于18，当此时为17', () => {
    expect(validator.validate({age: '17'}, [{field: 'age', rules: {'==': 18}}])).toEqual({msg: "age is error", res: false});
  });

  it('age必须小于等于18，当此时为17', () => {
    expect(validator.validate({age: '17'}, [{field: 'age', rules: {'<=': 18}}])).toEqual({msg: "success", res: true});
  });

  it('age必须小于等于18，当此时为18', () => {
    expect(validator.validate({age: '18'}, [{field: 'age', rules: {'<=': 18}}])).toEqual({msg: "success", res: true});
  });

  it('age必须小于18，当此时为18', () => {
    expect(validator.validate({age: '18'}, [{field: 'age', rules: {'<': 18}}])).toEqual({msg: "age is error", res: false});
  });

  it('age必须小于18，当此时为17', () => {
    expect(validator.validate({age: '17'}, [{field: 'age', rules: {'<': 18}}])).toEqual({msg: "success", res: true});
  });

  it('age必须小于18，当此时为17', () => {
    expect(validator.validate({age: '17'}, [{field: 'age', rules: {'<': 18}}])).toEqual({msg: "success", res: true});
  });

  // todo 考虑优化一下 == 和 === 的判断逻辑
})

describe('test array rules', () => {
  it('age必须满足isAge,且大于18，当此时为17', () => {
    expect(validator.validate({age: '17'}, [{field: 'age', rules: ['isAge', {'>': 18}]}])).toEqual({msg: "age is error", res: false});
  });

  it('age必须满足isAge,且大于18，当此时为19', () => {
    expect(validator.validate({age: '19'}, [{field: 'age', rules: ['isAge', {'>': 18}]}])).toEqual({msg: "success", res: true});
  });
})

describe('test need rules', () => {
  it('rules中的need不是数组', () => {
    expect(validator.validate({}, [{field: 'age', need: 'isRequired'}])).toEqual({msg: "failure", res: false});
  });

  it('age必须满足存在时，才校验job, 此时age不存在，job不存在', () => {
    const rules = [{ field: 'job', need: [{field: 'age'}] }];
    expect(validator.validate({age: '', job: ''}, rules)).toEqual({msg: "success", res: true});
  });

  it('age必须满足存在时，才校验job, 此时age存在，job不存在', () => {
    const rules = [{ field: 'job', need: [{field: 'age'}] }]
    expect(validator.validate({age: '17', job: ''}, rules)).toEqual({msg: "job is error", res: false});
  });

  it('age必须满足存在时，才校验job, 此时age存在，job存在', () => {
    const rules = [{ field: 'job', need: [{field: 'age'}] }]
    expect(validator.validate({age: '17', job: '学生'}, rules)).toEqual({msg: "success", res: true});
  });

  it('age必须满足大于等于18时，才校验job, 此时age为17，job不存在', () => {
    const rules = [{ field: 'job', need: [{field: 'age', rules: {'>=': 18}}] }];
    expect(validator.validate({age: '17', job: ''}, rules)).toEqual({msg: "success", res: true});
  });

  it('age必须满足大于等于18时，才校验job, 此时age为18，job不存在', () => {
    const rules = [{ field: 'job', need: [{field: 'age', rules: {'>=': 18}}] }];
    expect(validator.validate({age: '18', job: ''}, rules)).toEqual({msg: "job is error", res: false});
  });

  it('age必须满足大于等于18时，才校验job, 此时age为18，job存在', () => {
    const rules = [{ field: 'job', need: [{field: 'age', rules: {'>=': 18}}] }];
    expect(validator.validate({age: '18', job: '搬砖'}, rules)).toEqual({msg: "success", res: true});
  });
})

describe('test tip', () => {
  it('rules中的tip不是字符串', () => {
    expect(validator.validate({age: ''}, [{field: 'age', tip: {}}])).toEqual({msg: "failure", res: false});
  });

  it('rules中的tip是字符串', () => {
    expect(validator.validate({age: ''}, [{field: 'age', tip: '年龄必填'}])).toEqual({msg: "年龄必填", res: false});
  });
})