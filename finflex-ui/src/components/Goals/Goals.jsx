import "./Goals.css";
import { useState } from "react";
import Navbar from '../Navbar/Navbar';
import PersonalSide from "../PersonalSide/PersonalSide";

import GoalCreation from "../GoalCreation/GoalCreation";

const Goals = () => {
  const name = localStorage.getItem('name');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="personal">
      <div className="random">
        <PersonalSide />
      </div>
      <div className="plz">
        <Navbar />
        <div className="top">
          <div className="welcome">
            <h2 style={{ color: "#031D44" }}>View Your Goals, {name}</h2>
          </div>

          <div className="top1">
            <div className="search-bar">
              <input
                type="text"
                className="enter"
                placeholder="Search for specific goals"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn">
                Search
              </button>
            </div>
            <div className="pic2">
              <img style={{ width: "40px", marginLeft: "10px", padding: "10px" }} src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png" alt="Icon 1" />
            </div>
            <div className="pic2">
              <img style={{ width: "50px", marginRight: "10px", padding: "10px" }} src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" alt="Icon 2" />
            </div>
          </div>
        </div>
        <div className="tiles">
          <h1 className="bruh">Ready, Set, Goal!</h1>
          <h3 style={{ color: "white",  }}>Financial goal setting and management for higher achievers.</h3>
        </div>

        <h2 style={{ color: "#031D44", margin: "15px", padding: "15px", textAlign:"center", fontSize:"20px", fontWeight:"normal"  }} className="head"><span>Setting financial goals is the compass that guides you towards a secure and prosperous future. By defining your objectives, you gain clarity, motivation, and the roadmap to achieve financial success.</span></h2>
        <div style={{ backgroundColor: "#F2EFE9" }}>

          <GoalCreation searchQuery={searchQuery} />
        </div>
      </div>
    </div>
  );
}

export default Goals;
