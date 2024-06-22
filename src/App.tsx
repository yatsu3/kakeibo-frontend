import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="button" value="push" onClick={test} />
      </header>
    </div>
    </>
  );
}



export default App;
