import { isRequired } from '../src/validatorRules';

let testVar: any;

describe('校验undefined', () => {
  it('isRequired', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isEmpty', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isName', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isNumber', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isPhone', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isCode', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isBankcard', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isIdcard', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isAge', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isWx', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isMoney', () => {
    expect(isRequired(testVar)).toBe(false);
  })

  it('isEmail', () => {
    expect(isRequired(testVar)).toBe(false);
  })
})