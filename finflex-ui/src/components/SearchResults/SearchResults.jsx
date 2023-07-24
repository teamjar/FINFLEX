import React, { useContext } from "react";
import { StockContext } from "../../Context/StockContext";
import "./SearchResults.css"; 

const SearchResults = ({ results }) => {
  const { setStockSymbol } = useContext(StockContext);

  return (
    <ul className="search-results-container">
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className="search-result-item"
            onClick={() => setStockSymbol(item.symbol)}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
