// PersonalDashboard.js
import React, { useState } from "react";
import "./PersonalDashboard.css";
import Navbar from "../Navbar/Navbar";
import InfoTile from "../InfoTile/InfoTile";
import PersonalSide from "../PersonalSide/PersonalSide";
import Expense from "../Expense/Expense";

const PersonalDashboard = () => {
  const name = localStorage.getItem("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="personal">
      <div className="random">
        <PersonalSide />
      </div>
      <div className="plz">
        <Navbar />
        <div className="top">
          <div className="welcome">
            <h2 style={{ color: "#031D44" }}>Hello, {name}</h2>
          </div>

          <div className="top1">
            <div className="search-bar">
              <input
                type="text"
                className="enter"
                placeholder="Search for transactions and more"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn">
                Search
              </button>
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
              <img
                style={{
                  width: "50px",
                  marginRight: "10px",
                  padding: "10px",
                }}
                src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                alt="Icon 2"
              />
            </div>
          </div>
        </div>
        <div>
          <InfoTile />
        </div>

        <h2
          style={{
            color: "#031D44",
            margin: "15px",
            padding: "15px",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "normal",
          }}
          className="head"
        >
          <span>
            Tracking your finances empowers you to take control of your money,
            identify spending patterns, and make informed decisions for a stable
            financial future. Start taking control of your money by diligently
            recording transactions.
          </span>
        </h2>
        <Expense searchQuery={searchQuery} />
        <div className="personal2"></div>
      </div>

      {/* Modal */}
      {showModal && (
      <div className="clock">
        <div className="modal1">
          <div className="modal-content1">
            <span onClick={closeModal} className="close-button1">
            ✕</span>
            <h2 style={{color:"black", fontSize:"30px", textAlign:"center", backgroundColor:"#ece8df"}}>View Your Notification Center</h2>
   
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default PersonalDashboard;

