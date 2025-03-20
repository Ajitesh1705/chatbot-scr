import { AppBar, CardMedia, Toolbar } from "@mui/material";
import logo from "assets/images/Logo.svg";
import { Box } from "components";
import { logoImage, toolbarStyle } from "modules/Header/style";
import * as React from "react";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={(theme) => toolbarStyle(theme)}>
          <Box>
            <CardMedia component="img" image={logo} alt="Logo" sx={(theme) => logoImage(theme)} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
