import React, { useEffect, useState } from 'react';
import "../src/Common.css";
import DoughnutChart from './DoughnutChart';

interface KakeiboEntry {
    date: string;
    contents: string;
    category: string;
    subTotal: number;
    expenses: boolean; // isExpensesだとfalseになる
}

const Report: React.FC = () => {
    const [kakeiboData, setKakeiboData] = useState<KakeiboEntry[]>([]);
    const [categoryExpenses, setCategoryExpenses] = useState<{ [key: string]: number }>({});
    const [totalExpenses, setTotalExpenses] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_KAKEIBO_LOCAL_URL}/report`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    mode: "cors",
                    credentials: "include",
                });
                const getReportList: KakeiboEntry[] = await response.json();
                setKakeiboData(getReportList);
                // グラフに表示する支出額の計算
                calculateDoughnutChart(getReportList);
            } catch (error) {
                console.error("ERROR!", error);
            }
        };
        fetchData();
    }, []);

    const calculateDoughnutChart = (dummyDataList: KakeiboEntry[]) => {
        const categoryExpenses: { [key: string]: number } = {};
        let totalExpenses = 0;

        dummyDataList.forEach(kakeiboData => {
            if (kakeiboData.expenses) {
                if (!categoryExpenses[kakeiboData.category]) {
                    categoryExpenses[kakeiboData.category] = 0;
                }
                // カテゴリーごとの支出額を更新
                categoryExpenses[kakeiboData.category] += (categoryExpenses[kakeiboData.category] || 0) + kakeiboData.subTotal;
                // 合計支出額を更新
                totalExpenses += kakeiboData.subTotal;
            }
        });

        setCategoryExpenses(categoryExpenses);
        setTotalExpenses(totalExpenses);
    };

    return (
        <div>
            <center><h2>家計簿レポート</h2></center>
            <DoughnutChart categoryExpenses={categoryExpenses}/>
            <center><b>合計支出額：{totalExpenses}円</b></center>
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
                    {kakeiboData.map((entry, index) => (
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
