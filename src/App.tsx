import React, { useState, useEffect } from "react";
import { auth } from "./firebase"; // Firebase のインポート
import type { User } from "firebase/auth";
import Auth from "./Auth";
import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Form";
import Report from "./Report";
import UpdateUser from "./UpdateUser";
import Header from "./Header";
import LandingPage from "./LandingPage";
import SignUp from "./SignUp";
import Login from "./Login";

type UserType = User | null;

const App: React.FC = () => {
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe(); // クリーンアップ
    };
  }, []);

  return (
    <GlobalProvider>
      <Router>
        {user ? ( // ログイン済みの場合
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="/report" element={<Report />} />
              <Route path="/update-user" element={<UpdateUser />} />
            </Routes>
          </>
        ) : ( // 未ログインの場合
          <Routes>
            {/* <Route path="/" element={<Auth />} /> */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        )}
      </Router>
    </GlobalProvider>
  );
};

export default App;
