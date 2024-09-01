import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Header from './Header';
import Form from './Form';
import {GlobalProvider} from './context/GlobalContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Report from './Report';
import RegisterUser from './RegisterUser';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <GlobalProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/report" element={<Report />} />
          <Route path="/register-user" element={<RegisterUser />} />
        </Routes>
      </Router>
    </GlobalProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
