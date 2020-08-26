export interface FormData {
  [index: string]: any
}

type RulesType = string | {[index: string] :any} | any[]
type RulesNeed = {
  field: string,
  rules?: RulesType
}

export interface FormDataRules {
  field: string,
  name: string,
  tip?: string,
  rules?: RulesType,
  need?: RulesNeed[]
}
