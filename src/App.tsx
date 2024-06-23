import React from 'react';
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
        <input type="button" value="push" onClick={test} />
    </div>
    </>
  );
}

export default App;
