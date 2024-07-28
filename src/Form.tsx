import React, { useContext, useEffect, useRef, useState } from "react";
// import DatePicker, {registerLocale} from 'react-datepicker';
import {ja} from 'date-fns/locale';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "react-datepicker/dist/react-datepicker.css"
import "../src/Common.css";
import { GlobalContext } from "./context/GlobalContext";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import 'dayjs/locale/ja';
import dayjs from "dayjs";

dayjs.locale('ja');
const Form: React.FC = () => {
    const {date, setDate} = useContext(GlobalContext);
    const {contents, setContents} = useContext(GlobalContext);
    const {category, setCategory} = useContext(GlobalContext);
    const {subTotal ,setSubTotal} = useContext(GlobalContext);
    const {isExpenses, setIsExpenses} = useContext(GlobalContext);

    useEffect(() => {
      setCategory("");
    }, [isExpenses]);

    const kakeiboInfo = {
      date,
      contents,
      category,
      subTotal,
      isExpenses
    }

    const handleChangeContents = (event: React.ChangeEvent<HTMLInputElement>) => {
      setContents(event.target.value);
    }

    const handleChangeCategory = (event: SelectChangeEvent<string>) => {
      setCategory(event.target.value);
    }

    const handleChangesubTotal = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubTotal(event.target.value);
    }

    const registerKakeibo = async () => {
      try {
          const response = await fetch(`${process.env.REACT_APP_KAKEIBO_LOCAL_URL}/register-kakeibo`, {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json",
          },
          mode: "cors",
          credentials: "include",
          body: JSON.stringify(kakeiboInfo)
        });
        setContents("");
        setCategory("");
        setSubTotal("");
      } catch (error) {
        console.error("ERROR!")
      }
    }
  

    
    return (
      <>
      <div className="box-contents">
      <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      sx={{ gap: 2 }} // 親ボックスにギャップを追加
      >
            <LocalizationProvider dateAdapter={AdapterDayjs} dateFormats={{ year: 'YYYY年'}}>
              <DatePicker value={date} label="日付" format="YYYY/MM/DD" slotProps={{ calendarHeader: { format: 'YYYY年MM月'}}}/>
            </LocalizationProvider>
          <TextField id="outlined-basic" label="内容" variant="outlined" sx={{ maxWidth: 360, width: '100%' }} value={contents} onChange={handleChangeContents}/>
          <FormControl sx={{ maxWidth: 360, width: '100%' }}>
            <InputLabel id="demo-simple-select-label">食費</InputLabel>
            { isExpenses ?
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="カテゴリー"
              onChange={handleChangeCategory}
            >
              <MenuItem value="食費" selected>食費</MenuItem>
              <MenuItem value="雑費">雑費</MenuItem>
              <MenuItem value="交通費">交通費</MenuItem>
              <MenuItem value="固定費">固定費</MenuItem>
              <MenuItem value="その他">その他</MenuItem>
            </Select>
            :
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="カテゴリー"
              onChange={handleChangeCategory}
            >
              <MenuItem value="給料" selected>給料</MenuItem>
              <MenuItem value="副業">副業</MenuItem>
              <MenuItem value="臨時収入">臨時収入</MenuItem>
              <MenuItem value="おこづかい">おこづかい</MenuItem>
              <MenuItem value="その他">その他</MenuItem>
            </Select>}
          </FormControl>
          <TextField id="outlined-basic" label="合計" variant="outlined" sx={{ maxWidth: 360, width: '100%' }} value={subTotal} onChange={handleChangesubTotal}/>

          {isExpenses ? <Button variant="contained" onClick={registerKakeibo}>支出を入力</Button>
          :
          <Button variant="contained" onClick={registerKakeibo}>収入を入力</Button>}
          </Box>
          </div>
      </>
    );
}

export default Form;