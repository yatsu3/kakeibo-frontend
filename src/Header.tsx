import { AppBar, Box, Button, IconButton, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalContext";
import "../src/Common.css";

const Header: React.FC = () => {

    const {isExpenses, setIsExpenses} = useContext(GlobalContext);

    return (
        <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          家計簿
        </Typography>
            <Button className={isExpenses ? "expenses-btn active" : ""} color="inherit" onClick={() => setIsExpenses(true)}>支出</Button>
            <Button className={isExpenses ? "" : "income-btn active"} color="inherit" onClick={() => setIsExpenses(false)}>収入</Button>
      </Toolbar>
    </AppBar>
    );
}

export default Header;