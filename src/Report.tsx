import React, { useEffect, useState } from 'react';
import "../src/Common.css";

interface KakeiboEntry {
    date: string;
    contents: string;
    category: string;
    subTotal: number;
    expenses: boolean; // isExpensesだとfalseになる
  }

const Report: React.FC = () => {
    const [dummyData, setDummyData] = useState<KakeiboEntry[]>([]);

    let response = null;
    useEffect(() => {
        const fetchData = async () => {
            try {
              response = await fetch(`${process.env.REACT_APP_KAKEIBO_LOCAL_URL}/report`, {
                method: "GET",
                headers: {
                  "Content-Type" : "application/json",
                  "Accept": "application/json",
                },
                mode: "cors",
                credentials: "include",
              });
            const getReportList: KakeiboEntry[] = await response.json();
            setDummyData(getReportList);
            } catch (error) {
              console.error("ERROR!", error);
            }
          };
          fetchData();
    },[]);

  return (
    <div>
    <center><h2>家計簿レポート</h2></center>
    <table className="table-design">
      <thead>
        <tr>
          <th>日付</th>
          <th>支出/収入</th>
          <th>カテゴリー</th>
          <th>内容</th>
          <th>小計</th>
        </tr>
      </thead>
      <tbody>
        {dummyData.map((entry, index) => (
          <tr key={index}>
            <td>{entry.date}</td>
            <td>{entry.expenses ? '支出' : '収入'}</td>
            <td>{entry.category}</td>
            <td>{entry.contents}</td>
            <td>{entry.subTotal}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Report;