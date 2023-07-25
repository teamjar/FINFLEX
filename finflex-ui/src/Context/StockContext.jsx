import React, { useState } from 'react';

const StockContext = React.createContext();

const StockProvider = ({ children, symbol }) => {
  const [stockSymbol, setStockSymbol] = useState(symbol);

  return (
    <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
      {children}
    </StockContext.Provider>
  );
};

export { StockProvider, StockContext };


