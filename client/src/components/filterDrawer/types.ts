export enum FilterSectionTypeEnum {
  SELECT,
}

export interface IFilterOptionSelect {
  readonly key: string,
  readonly label: string,
  readonly isChecked: boolean,
}

export interface IFilterSectionSelect {
  readonly type: FilterSectionTypeEnum,
  readonly options: {[key: string]: IFilterOptionSelect},
  readonly name?: string,
}

export type IFilterSection = IFilterSectionSelect // | ...

export interface IFilterSections {
  [key: symbol]: IFilterSection
}
