import React from "react";
import Card from "../Card/Card";
import './Details.css';

const Details = ({ details }) => {

  const detailsList = {
    name: "Name",
    country: "Country",
    currency: "Currency",
    exchange: "Exchange",
    ipo: "IPO Date",
    marketCapitalization: "Market Capitalization",
    finnhubIndustry: "Industry",
  };

  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };

  console.log("Details List:", detailsList);

  return (
    <Card>
      <ul className="details-list">
        {Object.keys(detailsList).map((item, index, arr) => {
          const isLastItem = index === arr.length - 1;
          return (
            <li key={item} className={`details-item ${isLastItem ? '' : 'details-item-bordered'}`}>
              <span>{detailsList[item]}</span>
              <span className="details-value">
                {item === "marketCapitalization"
                  ? `${convertMillionToBillion(details[item])}B`
                  : details[item]}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};

export default Details;

