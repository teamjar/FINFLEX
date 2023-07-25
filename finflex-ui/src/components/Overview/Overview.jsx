import React from "react";
import Card from "../Card/Card";
import './Overview.css';

const Overview = ({ symbol, price, change, changePercent, currency }) => {
    console.log("Symbol:", symbol);
    console.log("Price:", price);
    console.log("Currency:", currency);
    console.log("Change:", change);
    console.log("Change Percent:", changePercent);
  return (
    <Card>
      <span className="overview-symbol">
        {symbol} 
      </span>
      <div className="overview-content">
        <span className="overview-price">
          ${price}
          <span className="overview-currency">
            {currency}
          </span>
        </span>
        <span className={`overview-change ${change > 0 ? "positive" : "negative"}`}>
          {change} <span>({changePercent}%)</span>
        </span>
      </div>
    </Card>
  );
};

export default Overview;
