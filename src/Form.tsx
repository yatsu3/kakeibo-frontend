import React, { useRef, useState } from "react";
import DatePicker, {registerLocale} from 'react-datepicker';
import {ja} from 'date-fns/locale';
import "react-datepicker/dist/react-datepicker.css"
import "../src/Common.css";
const Form: React.FC = () => {

    const [date, setDate] = useState(new Date());
    const [contents, setContents] = useState("");
    const [category, setCategory] = useState("食費");
    const [expenditure ,setExpenditure] = useState("");

    const kakeiboInfo = {
      date,
      contents,
      category,
      expenditure
    }

    registerLocale('ja', ja);

    const handleChangeContents = (event: React.ChangeEvent<HTMLInputElement>) => {
      setContents(event.target.value);
    }

    const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setCategory(event.target.value);
    }

    const handleChangeExpenditure = (event: React.ChangeEvent<HTMLInputElement>) => {
      setExpenditure(event.target.value);
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
        setExpenditure("");
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
            <select id="dropdown" className="dropdown" onChange={handleChangeCategory} value={category}>
              <option value="食費">食費</option>
              <option value="雑費">雑費</option>
              <option value="交通費">交通費</option>
              <option value="固定費">固定費</option>
              <option value="その他">その他</option>
            </select>
          </span>
          <span>合計：
            <input type="number" value={expenditure} onChange={handleChangeExpenditure}></input>
          </span>
          <input type="button" value="入力する" onClick={registerKakeibo} className="register-btn"/>
        </div>
      </>
    );
}

export default Form;