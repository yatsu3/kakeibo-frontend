import { AppBar, Box, Button, IconButton, Typography } from "@mui/material";
import Toolbar from "@mui/material/Toolbar/Toolbar";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "./context/GlobalContext";
import "../src/Common.css";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const {isExpenses, setIsExpenses} = useContext(GlobalContext);

    return (
        <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          家計簿
        </Typography>
            <Button color="inherit" onClick={() => {setIsExpenses(true); navigate('/');}}>支出</Button>
            <Button color="inherit" onClick={() => {setIsExpenses(false); navigate('/');}}>収入</Button>
            <Button color="inherit" onClick={() => navigate('/report')}>レポート</Button>
            <Button color="inherit" onClick={() => navigate('/register-user')}>ユーザー登録</Button>
      </Toolbar>
    </AppBar>
    );
}

export default Header;