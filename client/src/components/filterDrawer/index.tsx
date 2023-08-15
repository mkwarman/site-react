import { Box, Paper } from "@mui/material"
import { IFilterSections, IFilterSection, IFilterSectionSelect } from "./types"
import { CheckboxSection } from "./checkboxSection"
import { useCallback } from "react"

export interface IFilterDrawerProps<T> {
  readonly filterSections: T,
  readonly width?: number,
  readonly onChange: (filterSections: T) => void
}

export const FilterDrawer = <T extends IFilterSections>(props: IFilterDrawerProps<T>) => {
  const onChange = useCallback((key: string, updated: IFilterSection) => {
    const update = {
      ...props.filterSections,
      [key]: updated
    }

    props.onChange(update);
  }, [props])

  const { filterSections, width } = props;
  return (
    <Paper sx={{width}}>
      <Box padding={1}>
        {Object.entries(filterSections).map(([key, section]) => 
          <CheckboxSection key={key} section={section} onChange={(updated: IFilterSectionSelect) => onChange(key, updated)} />
        )}
      </Box>
    </Paper>
  )
}