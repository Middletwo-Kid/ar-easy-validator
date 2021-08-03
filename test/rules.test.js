import rules from '../src/rules';

describe('test isRequired', () => {
  it('val=undefined', () => {
    expect(rules.isRequired(undefined)).toBe(false);
  });

  it('val=""', () => {
    expect(rules.isRequired('')).toBe(false);
  });

  it('val=0', () => {
    expect(rules.isRequired(0)).toBe(true);
  });

  it('val=null', () => {
    expect(rules.isRequired(null)).toBe(false);
  });

  it('val={}', () => {
    expect(rules.isRequired({})).toBe(false);
  });

  it('val={a: 1}', () => {
    expect(rules.isRequired({a: 1})).toBe(true);
  });

  it('val=[]', () => {
    expect(rules.isRequired([])).toBe(false);
  });

  it('val=[1,2,3]', () => {
    expect(rules.isRequired([1,2,3])).toBe(true);
  });

  it('val=1', () => {
    expect(rules.isRequired(1)).toBe(true);
  });
})

describe('test isEmail', () => {
  it('val=658457485', () => {
    expect(rules.isEmail('658457485')).toBe(false);
  });

  it('val=658457485@qq.com', () => {
    expect(rules.isEmail('658457485@qq.com')).toBe(true);
  });
})

describe('test isMobile', () => {
  it('val=658457485', () => {
    expect(rules.isMobile('658457485')).toBe(false);
  });

  it('val=13800138000', () => {
    expect(rules.isMobile('13800138000')).toBe(true);
  });

  it('val=13600136000', () => {
    expect(rules.isMobile('13600136000')).toBe(true);
  });

  it('val=16600166000', () => {
    expect(rules.isMobile('16600166000')).toBe(true);
  });
})

describe('test isConcat', () => {
  it('val=658457485', () => {
    expect(rules.isConcat('658457485')).toBe(false);
  });

  it('val=010-51472720', () => {
    expect(rules.isConcat('010-51472720')).toBe(true);
  });

  it('val=51472720', () => {
    expect(rules.isConcat('51472720')).toBe(true);
  });

  it('val=13800138000', () => {
    expect(rules.isConcat('13800138000')).toBe(true);
  });

  it('val=13600136000', () => {
    expect(rules.isConcat('13600136000')).toBe(true);
  });

  it('val=16600166000', () => {
    expect(rules.isConcat('16600166000')).toBe(true);
  });
})

describe('test isWx', () => {
  it('val=658457485', () => {
    expect(rules.isWx('658457485')).toBe(false);
  });

  it('val=wysg38273656', () => {
    expect(rules.isWx('wysg38273656')).toBe(true);
  });

  it('val=13800138000', () => {
    expect(rules.isWx('13800138000')).toBe(true);
  });
})

describe('test isName', () => {
  it('val=""', () => {
    expect(rules.isName('')).toBe(false);
  });

  it('val=小明', () => {
    expect(rules.isName('小明')).toBe(true);
  });

  it('val=小明yyds', () => {
    expect(rules.isName('小明yyds')).toBe(false);
  });

  it('val=易烊千玺', () => {
    expect(rules.isName('易烊千玺')).toBe(true);
  });
})

describe('test isNumber', () => {
  it('val=""', () => {
    expect(rules.isNumber('')).toBe(false);
  });

  it('val=a', () => {
    expect(rules.isNumber('a')).toBe(false);
  });

  it('val=小明yyds', () => {
    expect(rules.isNumber('小明yyds')).toBe(false);
  });

  it('val=1', () => {
    expect(rules.isNumber(1)).toBe(true);
  });

  it('val="1"', () => {
    expect(rules.isNumber("1")).toBe(true);
  });

  it('val=1.2', () => {
    expect(rules.isNumber(1.2)).toBe(true);
  });
})

describe('test isPositiveInt', () => {
  it('val=""', () => {
    expect(rules.isPositiveInt('')).toBe(false);
  });

  it('val=a', () => {
    expect(rules.isPositiveInt('a')).toBe(false);
  });

  it('val=-1', () => {
    expect(rules.isPositiveInt(-1)).toBe(false);
  });

  it('val=0', () => {
    expect(rules.isPositiveInt(0)).toBe(true);
  });

  it('val=1', () => {
    expect(rules.isPositiveInt(1)).toBe(true);
  });

  it('val="1"', () => {
    expect(rules.isPositiveInt("1")).toBe(true);
  });

  it('val=1.2', () => {
    expect(rules.isPositiveInt(1.2)).toBe(false);
  });
})

describe('test isBankcard', () => {
  it('val=""', () => {
    expect(rules.isBankcard('')).toBe(false);
  });

  it('val=6228480088141848874', () => {
    expect(rules.isBankcard('6228480088141848874')).toBe(true);
  });

  it('val=8228480088141', () => {
    expect(rules.isBankcard(8228480088141)).toBe(false);
  });
})

describe('test isMoney', () => {
  it('val=""', () => {
    expect(rules.isMoney('')).toBe(false);
  });

  it('val=-1', () => {
    expect(rules.isAge('-1')).toBe(false);
  });

  it('val=120', () => {
    expect(rules.isAge(120)).toBe(true);
  });

  it('val=12', () => {
    expect(rules.isAge(12)).toBe(true);
  });
})

describe('test isMoney', () => {
  it('val=""', () => {
    expect(rules.isMoney('')).toBe(false);
  });

  it('val=-1', () => {
    expect(rules.isMoney(-1)).toBe(false);
  });

  it('val=0', () => {
    expect(rules.isMoney(0)).toBe(true);
  });

  it('val=12', () => {
    expect(rules.isMoney(12)).toBe(true);
  });

  it('val=12.22', () => {
    expect(rules.isMoney(12.22)).toBe(true);
  });

  it('val=12.223', () => {
    expect(rules.isMoney(12.223)).toBe(false);
  });
})

describe('test isChinese', () => {
  it('val=""', () => {
    expect(rules.isChinese('')).toBe(false);
  });

  it('val=小明yyds', () => {
    expect(rules.isChinese('小明yyds')).toBe(false);
  });

  it('val=王花花', () => {
    expect(rules.isChinese('王花花')).toBe(true);
  });
})

describe('test isEnglish', () => {
  it('val=""', () => {
    expect(rules.isEnglish('')).toBe(false);
  });

  it('val=小明yyds', () => {
    expect(rules.isEnglish('小明yyds')).toBe(false);
  });

  it('val=yysd', () => {
    expect(rules.isEnglish('yysd')).toBe(true);
  });
})

describe('test isUrl', () => {
  it('val=""', () => {
    expect(rules.isUrl('')).toBe(false);
  });

  it('val=www.baidu.com', () => {
    expect(rules.isUrl('www.baidu.com')).toBe(false);
  });

  it('val=http://www.baidu.com', () => {
    expect(rules.isUrl('http://www.baidu.com')).toBe(true);
  });
})

describe('test isIdcard', () => {
  it('val=""', () => {
    expect(rules.isIdcard('')).toBe(false);
  });

  it('val=110101199003079198', () => {
    expect(rules.isIdcard('110101199003079198')).toBe(true);
  });

  it('val=110101199003079111', () => {
    expect(rules.isIdcard('110101199003079111')).toBe(false);
  });
})