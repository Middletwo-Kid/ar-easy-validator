import validator from '../src/index';

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

  it('比较NaN', () => {
    expect(validator.validate({test: NaN}, [{field: 'test', rules: {'===': NaN}}])).toEqual({msg: "success", res: true});
  });

  it('比较+0和0', () => {
    expect(validator.validate({test: +0}, [{field: 'test', rules: {'===': -0}}])).toEqual({msg: "test is error", res: false});
  });

  it('比较两个对象', () => {
    expect(validator.validate({obj: {a: 1, b: 2}}, [{field: 'obj', rules: {'===': {a: 1, b: 2}}}])).toEqual({msg: "success", res: true});
  });

  it('比较两个对象', () => {
    expect(validator.validate({obj: {a: 1, b: 2}}, [{field: 'obj', rules: {'===': {a: 1, b: 2, c: 3}}}])).toEqual({msg: "obj is error", res: false});
  });

  it('比较两个对象', () => {
    expect(validator.validate({obj: {a: 1, b: 2}}, [{field: 'obj', rules: {'===': {a: 1, b: 3}}}])).toEqual({msg: "obj is error", res: false});
  });
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

describe('test addRule', () => {
  it('新增rule规则, key为对象', () => {
    validator.addRule({}, () => {});
    expect(validator.validate({age: 18}, [{field: 'age', rules: {}}])).toEqual({msg: "failure", res: false});
  });

  it('新增rule规则, key为validate', () => {
    validator.addRule('validate', () => {});
    expect(validator.validate({age: 18}, [{field: 'age', rules: 'validate'}])).toEqual({msg: "failure", res: false});
  });

  it('新增rule规则, key为addRule', () => {
    validator.addRule('addRule', () => {});
    expect(validator.validate({age: 18}, [{field: 'age', rules: 'addRule'}])).toEqual({msg: "failure", res: false});
  });

  it('新增rule规则, key为字符串，cb为非函数', () => {
    validator.addRule('testArrayLength1', null);
    expect(validator.validate({arr: [1,2,3]}, [{field: 'arr', rules: 'testArrayLength1'}])).toEqual({msg: "failure", res: false});
  });

  it('新增rule规则, key为字符串，cb为函数', () => {
    validator.addRule('testArrayLength2', function(value){
      return value && value.length > 2 && value.length < 4;
    });
    const rules = [{ field: 'arr', rules: 'testArrayLength2'}];
    expect(validator.validate({ arr: [1, 2, 3, 4]}, rules)).toEqual({msg: "arr is error", res: false});
    expect(validator.validate({ arr: [1, 2, 3]}, rules)).toEqual({msg: "success", res: true});
  });
})

describe('test complete case', () => {
  const formData = {
    name: '姓名',
    sex: '',
    age: 18,
    isStudent: 0,
    job: ''
  };
  const formDataRules = [
    // name必须符合名字规则
    { field: 'name', name: '姓名', rules: 'isName'},
    // sex必填
    { field: 'sex', name: '性别'},
    // age大于15
    { field: 'age', name: '年龄', rules: {'>': 15}},
    // isStudent必填，可传递提示语
    { field: 'isStudent', name: '是否是学生', tip: '是否是学生是必填项'},
    // 当isStudent==1时才会去校验job字段
    { field: 'job', name: '工作', need: [{field: 'isStudent', rules: {'===': 1}}]}
  ]

  it('sex is error', () => {
    expect(validator.validate(formData, formDataRules)).toEqual({msg: "sex is error", res: false});
  });

  const formData2 = {
    name: '姓名',
    sex: '女',
    age: 18,
    isStudent: 0,
    job: ''
  };

  it('formData2 is correct', () => {
    expect(validator.validate(formData2, formDataRules)).toEqual({msg: "success", res: true});
  });
})
