import React, { useState } from 'react';

const StockContext = React.createContext();

const StockProvider = ({ children }) => {
  const [stockSymbol, setStockSymbol] = useState(null);

  return (
    <StockContext.Provider value={{ stockSymbol, setStockSymbol }}>
      {children}
    </StockContext.Provider>
  );
};

export { StockProvider, StockContext };

// import React from "react";

// const StockContext = React.createContext();

// export default StockContext;