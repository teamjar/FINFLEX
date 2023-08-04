import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { StockProvider, StockContext } from "../../Context/StockContext";
import { fetchStockDetails, fetchQuote } from '../api/stock-api';
import Chart from '../Chart/Chart';
import Navbar2 from '../Navbar2/Navbar2';
import StockSide from '../StockSide/StockSide';
import Overview from "../Overview/Overview";
import "./StockDetails.css";
import Details from "../Details/Details";
import BuyStock from "../BuyStock/BuyStock"

const StockDetails = () => {
  const { symbol } = useParams();
  const [stockDetails, setStockDetails] = useState({});
  const [quote, setQuote] = useState({});
  const [showBuyModal, setShowBuyModal] = useState(false); // New state variable for modal visibility

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
    setShowBuyModal(true); // Show the modal when Buy button is clicked
  };

  const goBack = () => {
    navigate(`/stocks`);
  };

  return (
    <StockProvider symbol={symbol}>
      <div className="stock-details">
        <div className="Navbar">
          <Navbar2 />
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

        {/* Buy Button */}
        <div className="BuyButton">
          <button onClick={buyStock} className="btn" style={{ margin: "10px" }}>Buy Stocks</button>
          <button onClick={goBack} className="btn" style={{ margin: "10px" }}>Return Back</button>
        </div>

        {/* Buy Stocks Modal */}
        {showBuyModal && (
          <div className="modal">
            <div className="modal-content">
              <BuyStock symbol={symbol} closeModal={() => setShowBuyModal(false)} />
            </div>
          </div>
        )}
      </div>
    </StockProvider>
  );
};

export default StockDetails;
