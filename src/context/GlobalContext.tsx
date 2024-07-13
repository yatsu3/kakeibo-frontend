import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface GlobalContextProps {
    isExpenses: boolean;
    setIsExpenses: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
    isExpenses: true,
    setIsExpenses: () => {},
};

export const GlobalContext = createContext<GlobalContextProps>(defaultState);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isExpenses, setIsExpenses] = useState<boolean>(true);

    return (
        <GlobalContext.Provider value={{ isExpenses, setIsExpenses }}>
            {children}
        </GlobalContext.Provider>
    );
};
