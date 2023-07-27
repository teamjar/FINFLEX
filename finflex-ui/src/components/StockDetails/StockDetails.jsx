import { useParams, useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { StockProvider, StockContext } from "../../Context/StockContext";
import { fetchStockDetails, fetchQuote } from '../api/stock-api';
import Chart from '../Chart/Chart'
import Navbar from '../Navbar/Navbar'
import StockSide from '../StockSide/StockSide'
import Overview from "../Overview/Overview";
import "./StockDetails.css"
import Details from "../Details/Details";


const StockDetails = () => {
  const { symbol } = useParams();
  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchStockDetails(symbol);
        const quote = await fetchQuote(symbol);
        setStockDetails(details);
        setQuote(quote);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();
  }, [symbol]);

  const navigate = useNavigate();

  const buyStock = () => {
    navigate(`/stock-details/${symbol}/buy`);
  };

  return (
    <StockProvider symbol={symbol}>
      <div className="stock-details">
        <div className="Navbar">
          <Navbar />
        </div>
        <div className="Overview">
          <Overview 
            symbol={symbol} 
            price={quote.c} 
            change={quote.d} 
            changePercent={quote.dp} 
            currency={stockDetails.currency} 
          />
        </div>
        <div className="Chart">
          <Chart />
        </div>
        <div className="StockSide">
          <StockSide />
        </div>
        <div className="Details">
          <Details details={stockDetails} />
      </div>
      <div className="BuyButton">
        <button onClick={buyStock}>Buy Stocks</button>
      </div>
        

      </div>
    </StockProvider>
  );
};

export default StockDetails;

