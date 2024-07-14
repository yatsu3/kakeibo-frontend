import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface GlobalContextProps {
    date: Date;
    setDate: (value: Date) => void;
    contents: string;
    setContents: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    subTotal: string;
    setSubTotal: (value: string) => void;
    isExpenses: boolean;
    setIsExpenses: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
    date: new Date(),
    setDate: () => {},
    contents: '',
    setContents: () => {},
    category: '',
    setCategory: () => {},
    subTotal: '0',
    setSubTotal: () => {},
    isExpenses: true,
    setIsExpenses: () => {},
};

export const GlobalContext = createContext<GlobalContextProps>(defaultState);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [date, setDate] = useState<Date>(new Date());
    const [contents, setContents] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [subTotal, setSubTotal] = useState<string>('');
    const [isExpenses, setIsExpenses] = useState<boolean>(true);

    return (
        <GlobalContext.Provider value={{
            date,
            setDate,
            contents,
            setContents,
            category,
            setCategory,
            subTotal,
            setSubTotal,
            isExpenses,
            setIsExpenses,
            }}>
            {children}
        </GlobalContext.Provider>
    );
};
