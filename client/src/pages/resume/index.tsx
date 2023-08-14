import { Paper } from "@mui/material"

export const Resume = () => {
  return (
    <Paper sx={{height: "85vh"}}>
      <object data="/static/MattWarmanResume.pdf" type="application/pdf" width="100%" height="100%"></object>
    </Paper>
  )
}
