import './StockCarousel.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { remoteHostURL } from '../../apiClient';
import { fetchQuote } from '../api/stock-api';
import { StockProvider } from '../../Context/StockContext';
import Chart from '../Chart/Chart';

function StockCarousel() {
 const [stocks, setStocks] = useState([]);
 const colors = ['color-1', 'color-2', 'color-3', 'color-4'];
  const scroll = (scrollOffset) => {
   document.querySelector('.carousel').scrollLeft += scrollOffset;
 };

 useEffect(() => {
  const fetchStocks = async () => {
    try {
      const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

      const userId = localStorage.getItem('userId');
      const res = await axios.get(`${remoteHostURL}/stocks/${userId}`, config);
      if (res?.data?.database) {
        const updatedStocks = await Promise.all(
          res.data.database.map(async (stock) => {
            const quote = await fetchQuote(stock.ticker);
            return {
              ...stock,
              stockprice: quote.c,
              change: quote.dp,
            };
          }),
        );
        setStocks(updatedStocks);
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchStocks();

  const interval = setInterval(fetchStocks, 30000); 

  return () => clearInterval(interval);
}, []);



return (
  <div className="carousel-container">  
    <button className="scroll-button left" onClick={() => scroll(-200)}>←</button>
    <div className="carousel">
      {stocks.map((stock, index) => (
        <Link to={`/stock-details/${stock.ticker}`} key={stock.ticker}>
          <div key={stock.id} className="stock-card">
            <div className= "companyInfo">
              <div className= "companyLogo">
                <img style={{borderRadius:"50%"}} src={stock.logo}/>
              </div>
              <div className = "companyT&N">
                {stock.ticker}
                <br/>
                {stock.companyname}
              </div>
            </div>
            <div className = "companyPandC">
              <p style={{color:"black", fontSize: "20px"}}>${stock.stockprice.toFixed(2)}</p> 
              <p className={stock.change > 0 ? "green" : "red"} style={{fontWeight:"bolder"}}>{stock.change > 0 ? '↑' : '↓'} {stock.change.toFixed(2)}% </p>
            </div>
          </div>
        </Link>      
      ))}
     </div> 
  </div>
);



}

export default StockCarousel;







