import Navbar2 from "../Navbar2/Navbar2"
import StockSide from "../StockSide/StockSide";
import NewsFeed from "../NewsFeed/NewsFeed"
import React, { useState, useEffect, useRef } from "react";

const NewsPage = () => {
  const name = localStorage.getItem('name');
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

    return (
        <div className="plz">
            <Navbar2 />
            <StockSide />

        <div className="top">
        <div className="welcome">
        <h2 style={{color:"#031D44"}}>View Your News Feed, {name}</h2>
        </div>
        <div className="top1">
        <div className="search-bar">
          <input style={{margin:"10px", padding:"12px"}}
            placeholder="Search for articles"
            className="enter" 
          />
          
          <button type="submit" className="btn">Search</button>
        </div>
        <div className="pic2">
        <img
                style={{
                  width: "40px",
                  marginLeft: "10px",
                  padding: "10px",
                  cursor: "pointer",
                }}
                src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png"
                alt="Icon 1"
                onClick={openModal}
              />
        </div>
        <div className="pic2">
          <img style={{width:"50px", marginRight:"10px", padding:"10px"}} src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" />
        </div>
        </div>
        </div>

        <NewsFeed />
              <br></br>

        {showModal && (
      <div className="clock">
        <div className="modal2">
          <div className="modal-content2">
            <span onClick={closeModal} className="close-button2">
            ✕</span>
            <h2 style={{color:"black", fontSize:"30px", textAlign:"center", backgroundColor:"whitesmoke"}}>View Your Notification Center</h2>
   
          </div>
        </div>
      </div>
      )}


    </div>
    );
}

export default NewsPage;