import React, { useContext, useEffect, useRef, useState } from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import {ja} from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css"
import "../src/Common.css";
import { GlobalContext } from "./context/GlobalContext";
const Form: React.FC = () => {
    const {date, setDate} = useContext(GlobalContext);
    const {contents, setContents} = useContext(GlobalContext);
    const {category, setCategory} = useContext(GlobalContext);
    const {subTotal ,setSubTotal} = useContext(GlobalContext);
    const {isExpenses, setIsExpenses} = useContext(GlobalContext);

    useEffect(() => {
      setCategory(isExpenses ? "食費" : "給料")
    }, [isExpenses]);

    const kakeiboInfo = {
      date,
      contents,
      category,
      subTotal,
      isExpenses
    }

    registerLocale('ja', ja);

    const handleChangeContents = (event: React.ChangeEvent<HTMLInputElement>) => {
      setContents(event.target.value);
    }

    const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        setCategory("食費");
        setSubTotal("");
      } catch (error) {
        console.error("ERROR!")
      }
    }
  

    
    return (
      <>
        <div className="text-box">
          <span>日付：
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={date}
              onChange={(selectedDate: any) => {setDate(selectedDate || new Date())}}
              locale='ja'
            />
          </span>
          <span>内容：
            <input type="text" placeholder="パスタ" value={contents} onChange={handleChangeContents}></input>
          </span>
          <span>カテゴリー：
            {isExpenses ?
            <select id="dropdown" className="dropdown" onChange={handleChangeCategory} value={category}>
              <option value="食費">食費</option>
              <option value="雑費">雑費</option>
              <option value="交通費">交通費</option>
              <option value="固定費">固定費</option>
              <option value="その他">その他</option>
            </select>
            :
            <select id="dropdown" className="dropdown" onChange={handleChangeCategory} value={category}>
              <option value="給料">給料</option>
              <option value="副業">副業</option>
              <option value="臨時収入">臨時収入</option>
              <option value="おこづかい">おこづかい</option>
              <option value="その他">その他</option>
            </select>}
          </span>
          <span>合計：
            <input type="number" value={subTotal} onChange={handleChangesubTotal}></input>
          </span>
          {isExpenses ? <input type="button" value="支出を入力" onClick={registerKakeibo} className="register-btn"/>
          :
          <input type="button" value="収入を入力" onClick={registerKakeibo} className="register-btn"/>}
        </div>
      </>
    );
}

export default Form;