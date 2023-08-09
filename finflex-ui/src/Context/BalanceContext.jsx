import React, { useContext, createContext, useReducer } from 'react';

const initialState = {
    totalInvestment: 0,
    totalBalance: 0,
};

const BalanceContext = createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_INVESTMENT':
            return {
                ...state,
                totalInvestment: action.payload,
            };
        case 'SET_BALANCE':
            return {
                ...state,
                totalBalance: action.payload,
            };
        case 'SUBTRACT_FROM_BALANCE':
            return {
                ...state,
                totalBalance: state.totalBalance - action.payload,
            };
        default:
            return state;
    }
};

const BalanceProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <BalanceContext.Provider value={{ state, dispatch }}>
            {children}
        </BalanceContext.Provider>
    );
};

export const useBalance = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
};

export { BalanceContext, BalanceProvider };
