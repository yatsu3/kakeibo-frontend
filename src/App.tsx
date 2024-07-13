import React, { useRef } from 'react';
import './App.css';

function App() {
  const inputName = useRef<HTMLInputElement>(null);
  const inputAge = useRef<HTMLInputElement>(null);
  
  const registerInfo = async () => {
    try {
        const name: string = inputName.current!.value;
        const age: number = parseInt(inputAge.current!.value);
        const response = await fetch(`${process.env.REACT_APP_KAKEIBO_LOCAL_URL}/register-info`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          "Accept": "application/json",
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({name, age})
      });
  
    } catch (error) {
      console.error("ERROR!")
    }
  }

  const test = async () => {
    try {
      const response = await fetch("http://localhost:8080/test", {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
          "Accept": "application/json",
        },
        mode: "cors",
        credentials: "include",
      });
  
      const data = await response.json();
    } catch (error) {
      console.error("ERROR!")
    }
  }
  return (
    <>
    <div className="App">
        <p>名前：<input type="text" ref={inputName}/></p>
        <p>年齢：<input type="text" ref={inputAge}/></p>
        <input type="button" value="データを登録" onClick={registerInfo} />
        <input type="button" value="Get Method push" onClick={test} />
    </div>
    </>
  );
}

export default App;
