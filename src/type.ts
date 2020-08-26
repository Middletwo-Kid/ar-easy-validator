export interface IFormData {
  [index: string]: any
}

type RulesType = string | {[index: string] :any} | any[]
type RulesNeed = {
  field: string,
  rules?: RulesType
}

export interface IFormDataRules {
  field: string,
  name: string,
  tip?: string,
  rules?: RulesType,
  need?: RulesNeed[]
}

export interface IValidatorRules {
  isRequired: any,
  isName: any,
  isPhone: any,
  isCode: any,
  isBankcard: any,
  isIdcard: any,
  isAge: any,
  isWx: any,
  isMoney: any,
  isEmail: any
}