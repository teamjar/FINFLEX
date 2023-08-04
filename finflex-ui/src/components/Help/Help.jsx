import "./Help.css"
import Navbar from '../Navbar/Navbar'
import PersonalSide from "../PersonalSide/PersonalSide"
import FAQPage from "../FAQPage/FAQPage"
import React, { useState } from "react";

const Help = () => {
    const name = localStorage.getItem('name');
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
            <h2 style={{color:"#031D44"}}>A list of FAQ, {name}</h2>
            </div>
            
            <div className="top1">
            <div className="search-bar">
                <input type="text" className="enter" placeholder="Search for transactions and more" />
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
        <div className="tiles4">
        <h1 className="bruh">Have Questions? We Have Answers!</h1>
        <h3 style={{color:"white"}}>Some of the most commonly asked financial assistance questions provided, along with the ability to ask your own.</h3>
        </div>
        <br></br>
        <div style={{backgroundColor:"#F2EFE9"}}>
        <FAQPage />
       
        <h2 style={{color:"#031D44", margin:"15px", padding:"15px", textAlign:"center"}} className="head"><span>Don't see a specific question answered above or want more financial assistance and advice? Ask the chat box below!</span></h2>
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>


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
    )
 }

 export default Help;