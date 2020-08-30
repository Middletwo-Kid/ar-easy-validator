export interface IFormData {
  [index: string]: any
}

type RulesType = string | {[index: string] :any} | any[]
export type RulesNeed = {
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
