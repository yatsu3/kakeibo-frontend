import { AppBar, Box, Button, IconButton, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import React from "react";

const Header: React.FC = () => {
    return (
        <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          家計簿
        </Typography>
            <Button color="inherit">支出</Button>
            <Button color="inherit">収入</Button>
      </Toolbar>
    </AppBar>
    );
}

export default Header;