import { useNavigate } from "react-router-dom";
import { StockContext } from "../../Context/StockContext";
import { useContext } from "react";
import "./SearchResults.css";

const SearchResults = ({ results }) => {
  const navigate = useNavigate();
  const { setStockSymbol } = useContext(StockContext);

  const handleClick = (symbol) => {
    setStockSymbol(symbol);
    navigate(`/stock-details/${symbol}`);
  };

  return (
    <ul className="search-results-container">
      {results.map((item) => (
        <li
          key={item.symbol}
          className="search-result-item"
          onClick={() => handleClick(item.symbol)}
        >
          <span>{item.symbol}</span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;

