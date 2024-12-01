// Firebase 9.x+ のスタイル
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase アプリの初期化
const firebaseConfig = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

// 必要な Firebase サービスをエクスポート
export const auth = getAuth(firebaseConfig);
