import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import { DriveEta } from "@mui/icons-material"

export const Navbar = () => {
  return (
    <AppBar position="static" enableColorOnDark >
      <Toolbar>
        <IconButton color="inherit" edge="start">
          <DriveEta />
        </IconButton>
        <Typography variant="h6">Full Cycle Delivery</Typography>
      </Toolbar>
    </AppBar>
  )
}