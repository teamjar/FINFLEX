import './StockCarousel.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { remoteHostURL } from '../../apiClient';

function StockCarousel() {
 const [stocks, setStocks] = useState([]);
 const colors = ['color-1', 'color-2', 'color-3', 'color-4'];
  const scroll = (scrollOffset) => {
   document.querySelector('.carousel').scrollLeft += scrollOffset;
 };

 useEffect(() => {
  const fetchStocks = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const res = await axios.get(`${remoteHostURL}/stocks/${userId}`);
      if (res?.data?.database) {
        setStocks(res.data.database);
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchStocks();


  const interval = setInterval(fetchStocks, 5000); 

  return () => clearInterval(interval);
}, []);



//  useEffect(() => {
//    const fetchStocks = async () => {
//      try {
//        const userId = localStorage.getItem('userId')
//        const res = await axios.get(`${remoteHostURL}/stocks/${userId}`);
//        if (res?.data?.database) {
//          setStocks(res.data.database);
//        }
//      } catch (err) {
//        console.log(err);
//      }
//    };
//    fetchStocks();
//  }, [])

 return (
   <div className="carousel-container">
     <button className="scroll-button left" onClick={() => scroll(-200)}>←</button>
     <div className="carousel">
     {stocks.map((stock, index) => (
       <Link to={`/stock-details/${stock.ticker}`} key={stock.ticker}>
         <div key={stock.id} className={`stock-card ${colors[index % 4]}`}>
           <h4>{stock.companyname}</h4>
           <p>Price: ${stock.stockprice}</p>
           <p className={stock.change > 0 ? "green" : "red"}>Change: {stock.change} {stock.change > 0 ? '↑' : '↓'}</p>
           <img src={stock.logo} alt={`${stock.companyname} logo`} className="stock-logo" />
         </div>
       </Link>
    
       ))}
     </div>
     <button className="scroll-button right" onClick={() => scroll(200)}>→</button>
   </div>
 );
}

export default StockCarousel;
