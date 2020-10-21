import * as Validator from '../src/validatorRules';

let testVar: any;

describe('校验undefined', () => {
  it('isRequired', () => {
    expect(Validator.isRequired(testVar)).toBe(false);
  })

  it('isEmpty', () => {
    expect(Validator.isEmpty(testVar)).toBe(true);
  })

  it('isName', () => {
    expect(Validator.isName(testVar)).toBe(false);
  })

  it('isNumber', () => {
    expect(Validator.isNumber(testVar)).toBe(false);
  })

  it('isPhone', () => {
    expect(Validator.isPhone(testVar)).toBe(false);
  })

  it('isCode', () => {
    expect(Validator.isCode(testVar)).toBe(false);
  })

  it('isBankcard', () => {
    expect(Validator.isBankcard(testVar)).toBe(false);
  })

  // it('isIdcard', () => {
  //   expect(Validator.isIdcard(testVar)).toBe(false);
  // })

  it('isAge', () => {
    expect(Validator.isAge(testVar)).toBe(false);
  })

  it('isWx', () => {
    expect(Validator.isWx(testVar)).toBe(false);
  })

  it('isMoney', () => {
    expect(Validator.isMoney(testVar)).toBe(false);
  })

  it('isEmail', () => {
    expect(Validator.isEmail(testVar)).toBe(false);
  })

  it('isChinese', () => {
    expect(Validator.isChinese(testVar)).toBe(false);
  })
})

describe('校验Chinese', () => {
  it('isChinese', () => {
    expect(Validator.isChinese('abc')).toBe(false);
  })
  it('isChinese', () => {
    expect(Validator.isChinese(1234)).toBe(false);
  })
  it('isChinese', () => {
    expect(Validator.isChinese('中文跟1234')).toBe(false);
  })
  it('isChinese', () => {
    expect(Validator.isChinese('中文')).toBe(true);
  })
})