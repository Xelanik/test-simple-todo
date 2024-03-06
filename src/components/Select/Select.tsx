import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import type { SelectChangeEvent } from "@mui/material"
import type { FC } from 'react'

type Props = {
  value: string | undefined
  change: (event: SelectChangeEvent) => void
}

const CustomSelect: FC<Props> = ({ value, change }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="custome-select">Filter</InputLabel>

      <Select
        labelId="custome-select"
        value={value}
        label="Filter"
        onChange={change}
      >
        <MenuItem value={undefined}>
          <em>None</em>
        </MenuItem>
        <MenuItem value={"completed"}>Completed</MenuItem>
        <MenuItem value={"notcompleted"}>No completed</MenuItem>
      </Select>
    </FormControl>
  )
}

export default CustomSelect
