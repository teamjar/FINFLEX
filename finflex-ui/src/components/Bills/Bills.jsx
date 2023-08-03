import "./Bills.css";
import { useState } from "react";
import Navbar from '../Navbar/Navbar';
import PersonalSide from "../PersonalSide/PersonalSide";
import BillCreation from "../BillCreation/BillCreation";

const Bills = () => {
  const name = localStorage.getItem('name');
  const [searchQuery, setSearchQuery] = useState('');
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
            <h2 style={{ color: "#031D44" }}>View Your Bills, {name}</h2>
          </div>

          <div className="top1">
            <div className="search-bar">
              <input
                type="text"
                className="enter"
                placeholder="Search for specifc bills"
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
              <img style={{ width: "50px", marginRight: "10px", padding: "10px" }} src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" alt="Icon 2" />
            </div>
          </div>
        </div>
        <div className="tiles2">
          <h1 className="bruh">Got Bills?</h1>
          <h3 style={{ color: "white" }}>View and manage all of your bills to keep them in check.</h3>
        </div>

        <h2 style={{ color: "#031D44", margin: "15px", padding: "15px", textAlign: "center", fontSize:"20px", fontWeight:"normal" }} className="head"><span>Easily add and track your bills, manage their status, and stay in control of your financial commitments. Take charge of your expenses with our intuitive platform, designed to streamline your bill management process effortlessly.</span></h2>

        <div style={{ backgroundColor: "#F2EFE9" }}>
          <BillCreation searchQuery={searchQuery} />
        </div>
      </div>
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
}

export default Bills;
