import React from "react";
import './ChartFilter.css';

const ChartFilter = ({ text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`chart-filter-button ${active ? "active" : ""}`}
    >
      {text}
    </button>
  );
};

export default ChartFilter;
