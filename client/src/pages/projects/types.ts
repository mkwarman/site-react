import { IFilterSection, IFilterSections } from "../../components/filterDrawer/types"

export const enum LinkTypeEnum {
  DOWNLOAD = "download",
  LINK = "link",
}

export const enum ButtonTypeEnum {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export interface ILink {
  buttonText: string,
  url: string,
  linkType: LinkTypeEnum,
  buttonType: ButtonTypeEnum
}

// TODO: Consider an interface for some kind of IFilterable that would allow the filter sections to be constructed dynamically
// Ideally something that would also allow ordering the sections and options by their commonality in the data
export interface IProject {
  id: number,
  name: string,
  description: string,
  technologies: string[],
  links?: ILink[],
}

export interface IProjectFilters extends IFilterSections {
  Technologies: IFilterSection
}
