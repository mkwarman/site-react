import { Box, Checkbox, Divider, FormControlLabel, FormGroup } from "@mui/material"
import { IFilterOptionSelect, IFilterSectionSelect } from "./types"
import { useCallback } from "react"

interface ICheckboxSection {
  section: IFilterSectionSelect,
  onChange: (section: IFilterSectionSelect) => void,
}

export const CheckboxSection = (props: ICheckboxSection) => {
  const onChange = useCallback((option: IFilterOptionSelect, isChecked: boolean) => {
    const override: {[key: string]: IFilterOptionSelect} = {
      [option.key]: {
        ...option,
        isChecked
      }
    }

    const update = {
      ...props.section,
      options: {
        ...props.section.options,
        ...override
      }
    };
    props.onChange(update);
  }, [props])
  
  return (
    <Box padding={1}>
      <Divider>{props.section.name}</Divider>
      <FormGroup>
        {Object.entries(props.section.options).map(([key, option]) => 
          <FormControlLabel
            key={key}
            control={
              <Checkbox value={option.isChecked} onChange={() => onChange(option, !option.isChecked)} />
            }
            label={option.label}
          />
        )}
      </FormGroup>
    </Box>
  )
}