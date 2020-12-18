import Validator  from '../src/Validator';
const v = new Validator();

describe('test isEmail', () => {
  it('val = undefined', () => {
    expect(v.isEmail(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isEmail(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isEmail('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isEmail(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isEmail([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isEmail({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isEmail('123')).toBe(false);
  });

  it('val = "123@qq.com"', () => {
    expect(v.isEmail('123@qq.com')).toBe(true);
  });
});

describe('test isPhone', () => {
  it('val = undefined', () => {
    expect(v.isPhone(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isPhone(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isPhone('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isPhone(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isPhone([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isPhone({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isPhone('123')).toBe(false);
  });

  it('val = "13800138000"', () => {
    expect(v.isPhone('13800138000')).toBe(true);
  });
});

describe('test isName', () => {
  it('val = undefined', () => {
    expect(v.isName(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isName(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isName('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isName(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isName([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isName({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isName('123')).toBe(false);
  });

  it('val = "王思聪"', () => {
    expect(v.isName('王思聪')).toBe(true);
  });
});

describe('test isNumber', () => {
  it('val = undefined', () => {
    expect(v.isNumber(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isNumber(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isNumber('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isNumber(0)).toBe(true);
  });

  it('val = []', () => {
    expect(v.isNumber([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isNumber({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isNumber('123')).toBe(true);
  });

  it('val = NaN', () => {
    expect(v.isNumber(NaN)).toBe(false);
  });

  it('val = 123', () => {
    expect(v.isNumber(123)).toBe(true);
  });

  it('val = 123.3', () => {
    expect(v.isNumber(123.3)).toBe(false);
  });
});

describe('test isCode', () => {
  it('val = undefined', () => {
    expect(v.isCode(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isCode(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isCode('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isCode(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isCode([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isCode({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isCode('123')).toBe(false);
  });

  it('val = 123456', () => {
    expect(v.isCode(123456)).toBe(true);
  });
});

describe('test isBanckcard', () => {
  it('val = undefined', () => {
    expect(v.isBanckcard(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isBanckcard(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isBanckcard('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isBanckcard(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isBanckcard([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isBanckcard({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isBanckcard('123')).toBe(false);
  });

  it('val = 123456', () => {
    expect(v.isBanckcard(1234564890123456)).toBe(true);
  });
});

describe('test isAge', () => {
  it('val = undefined', () => {
    expect(v.isAge(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isAge(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isAge('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isAge(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isAge([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isAge({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isAge('123')).toBe(false);
  });

  it('val = 123456', () => {
    expect(v.isAge(15)).toBe(true);
  });
});

describe('test isMoney', () => {
  it('val = undefined', () => {
    expect(v.isMoney(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isMoney(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isMoney('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isMoney(0)).toBe(true);
  });

  it('val = []', () => {
    expect(v.isMoney([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isMoney({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isMoney('123')).toBe(true);
  });

  it('val = 12.5', () => {
    expect(v.isMoney(12.5)).toBe(true);
  });

  it('val = 12.5555', () => {
    expect(v.isMoney(12.5555)).toBe(false);
  });
});

describe('test isMoneyNotLimt', () => {
  it('val = undefined', () => {
    expect(v.isMoneyNotLimt(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isMoneyNotLimt(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isMoneyNotLimt('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isMoneyNotLimt(0)).toBe(true);
  });

  it('val = []', () => {
    expect(v.isMoneyNotLimt([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isMoneyNotLimt({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isMoneyNotLimt('123')).toBe(true);
  });

  it('val = 12.5', () => {
    expect(v.isMoneyNotLimt(12.5)).toBe(true);
  });

  it('val = 12.5555', () => {
    expect(v.isMoneyNotLimt(12.5555)).toBe(true);
  });
});

describe('test isChinese', () => {
  it('val = undefined', () => {
    expect(v.isChinese(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isChinese(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isChinese('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isChinese(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isChinese([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isChinese({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isChinese('123')).toBe(false);
  });

  it('val = 王思聪王思聪', () => {
    expect(v.isChinese('王思聪王思聪')).toBe(true);
  });

  it('val = asd', () => {
    expect(v.isChinese('asd')).toBe(false);
  });
});

describe('test isEnglish', () => {
  it('val = undefined', () => {
    expect(v.isEnglish(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isEnglish(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isEnglish('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isEnglish(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isEnglish([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isEnglish({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isEnglish('123')).toBe(false);
  });

  it('val = 王思聪王思聪', () => {
    expect(v.isEnglish('王思聪王思聪')).toBe(false);
  });

  it('val = asd', () => {
    expect(v.isEnglish('asd')).toBe(true);
  });
});

describe('test isUrl', () => {
  it('val = undefined', () => {
    expect(v.isUrl(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isUrl(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isUrl('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isUrl(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isUrl([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isUrl({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isUrl('123')).toBe(false);
  });

  it('val = localhost:8080', () => {
    expect(v.isUrl('localhost:8080')).toBe(false);
  });

  it('val = http://localhost:8080', () => {
    expect(v.isUrl('http://localhost:8080')).toBe(true);
  });
});

describe('test isIp', () => {
  it('val = undefined', () => {
    expect(v.isIp(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isIp(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isIp('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isIp(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isIp([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isIp({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isIp('123')).toBe(false);
  });

  it('val = localhost:8080', () => {
    expect(v.isIp('localhost:8080')).toBe(false);
  });

  it('val = 127.0.0.0', () => {
    expect(v.isIp('127.0.0.0')).toBe(true);
  });
});

describe('test isIdcard', () => {
  it('val = undefined', () => {
    expect(v.isIdcard(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isIdcard(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isIdcard('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isIdcard(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isIdcard([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isIdcard({})).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isIdcard('123')).toBe(false);
  });

  it('val = 110101199003072220', () => {
    expect(v.isIdcard('110101199003072220')).toBe(false);
  });

  it('val = 110101199003079198', () => {
    expect(v.isIdcard('110101199003079198')).toBe(true);
  });
});

describe('test isRequired', () => {
  it('val = undefined', () => {
    expect(v.isRequired(undefined)).toBe(false);
  });

  it('val = null', () => {
    expect(v.isRequired(null)).toBe(false);
  });

  it('val = ""', () => {
    expect(v.isRequired('')).toBe(false);
  });

  it('val = 0', () => {
    expect(v.isRequired(0)).toBe(true);
  });

  it('val = []', () => {
    expect(v.isRequired([])).toBe(false);
  });

  it('val = {}', () => {
    expect(v.isRequired({})).toBe(false);
  });

  it('val = NaN', () => {
    expect(v.isRequired(NaN)).toBe(false);
  });

  it('val = "123"', () => {
    expect(v.isRequired('123')).toBe(true);
  });
});

describe('test isEmpty', () => {
  it('val = undefined', () => {
    expect(v.isEmpty(undefined)).toBe(true);
  });

  it('val = null', () => {
    expect(v.isEmpty(null)).toBe(true);
  });

  it('val = ""', () => {
    expect(v.isEmpty('')).toBe(true);
  });

  it('val = 0', () => {
    expect(v.isEmpty(0)).toBe(false);
  });

  it('val = []', () => {
    expect(v.isEmpty([])).toBe(true);
  });

  it('val = {}', () => {
    expect(v.isEmpty({})).toBe(true);
  });

  it('val = NaN', () => {
    expect(v.isEmpty(NaN)).toBe(true);
  });

  it('val = "123"', () => {
    expect(v.isEmpty('123')).toBe(false);
  });
});


const rule1 = {
  name: { rule: 'isRequired' }
}
describe('test string validator', () => {
  it('val = {name: "" }', () => {
    expect(v.validate({ name: '' }, rule1)).toBe(false);
  });

  it('val = {name: "王花花" }', () => {
    expect(v.validate({ name: '王花花' }, rule1 )).toBe(true);
  });
});

const rule2 = {
  score: { rule: { '===': 100 } }
}
describe('test object validator', () => {
  it('val = {score: "" }', () => {
    expect(v.validate({ score: '' }, rule2)).toBe(false);
  });

  it('val = {score: 100 }', () => {
    expect(v.validate({ score: 100 }, rule2 )).toBe(true);
  });

  it('val = {score: "100" }', () => {
    expect(v.validate({ score: "100" }, rule2 )).toBe(false);
  });
});

const rule3 = {
  score: { rule: [ 'isNumber', { '===': 100 } ] }
}
describe('test array validator', () => {
  it('val = {score: "" }', () => {
    expect(v.validate({ score: '' }, rule3)).toBe(false);
  });

  it('val = {score: 100 }', () => {
    expect(v.validate({ score: 100 }, rule3 )).toBe(true);
  });

  it('val = {score: "100" }', () => {
    expect(v.validate({ score: "100" }, rule3 )).toBe(false);
  });
});

const rule4 = {
  age: { rule: 'isAge'},
  job: { rule: 'isRequired', need: [ { field: 'age', rule: ['isAge', { '>=' : 18 } ] } ]}
}
describe('test need validator', () => {
  it('val = {age: 12, job: "" }', () => {
    expect(v.validate({ age: 12, job: "" }, rule4)).toBe(true);
  });

  it('val = {age: 18, job: "" }', () => {
    expect(v.validate({ age: 18, job: "" }, rule4)).toBe(false);
  });
});