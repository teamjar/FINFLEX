import React, { useState } from "react";
import "./Navbar2.css";
import { useNavigate } from 'react-router-dom'; 

const Navbar2 = () => {
  const [activeNavItem, setActiveNavItem] = useState("Personal");
  const navigate = useNavigate(); 

  const handleNavItemClick = (itemName) => {
    setActiveNavItem(itemName);

  
    if (itemName === "Stocks") {
      navigate("/stocks"); 
    }

  
    if (itemName === "Personal") {
      navigate("/personal"); 
    }
  };

  return (
    <nav className="navbar2">
      <div className="navbar__container">
        <img
          className="pic"
          src="https://cdn.freebiesupply.com/logos/large/2x/starbucks-coffee-logo-black-and-white.png"
        />
        <div
          className={`navbar__item ${
            activeNavItem === "Personal" ? "active" : ""
          }`}
          onClick={() => handleNavItemClick("Personal")}
        >
          Personal
        </div>
        <div
          className={`navbar__item ${
            activeNavItem === "Stocks" ? "active" : ""
          }`}
          onClick={() => handleNavItemClick("Stocks")}
        >
          Stocks
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;