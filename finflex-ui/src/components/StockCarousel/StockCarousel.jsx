import React from 'react'
import './StockCarousel.css'
import { Link } from 'react-router-dom';

function StockCarousel() {
  const stocks = [
    { id: 1, name: 'Apple', price: 150, change: 2 },
    { id: 2, name: 'Google', price: 2800, change: -10 },
    { id: 3, name: 'Microsoft', price: 220, change: 5 },
    { id: 4, name: 'Tesla', price: 700, change: -15 },
    { id: 5, name: 'Facebook', price: 250, change: 8 },
    { id: 6, name: 'Amazon', price: 3300, change: -20 },
    { id: 7, name: 'Netflix', price: 500, change: 10 },
  ];

  const colors = ['color-1', 'color-2', 'color-3', 'color-4'];

  const scroll = (scrollOffset) => {
    document.querySelector('.carousel').scrollLeft += scrollOffset;
  };

  return (
    <div className="carousel-container">
      <button className="scroll-button left" onClick={() => scroll(-200)}>←</button>
      <div className="carousel">
      {stocks.map((stock, index) => (
        <Link to={`/stock/${stock.id}`} key={stock.id}> 
          <div key={stock.id} className={`stock-card ${colors[index % 4]}`}>
            <h4>{stock.name}</h4>
            <p>Price: ${stock.price}</p>
            <p>Change: {stock.change}</p>
          </div>
        </Link>
      
        ))}
      </div>
      <button className="scroll-button right" onClick={() => scroll(200)}>→</button>
    </div>
  );
}

export default StockCarousel;

