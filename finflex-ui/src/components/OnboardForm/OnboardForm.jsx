import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./OnboardForm.css";
import axios from 'axios';
import { remoteHostURL } from "../../apiClient";

const OnboardForm = () => {
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [showPaydayInput, setShowPaydayInput] = useState(false);
  const [hasSavingsBudget, setHasSavingsBudget] = useState("");
  const [showSetAsideInput, setShowSetAsideInput] = useState(false);
  const [showProvidedInput, setShowProvidedInput] = useState(false);
  const [earnings, setEarnings] = useState(0);
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const nav = useNavigate();

  const handleEmploymentStatusChange = (event) => {
    const status = event.target.value;
    setEmploymentStatus(status);
    setShowPaydayInput(status === "Working part time" || status === "Working full time");
  };

  const handleSavingsBudgetChange = (event) => {
    const selection = event.target.value;
    setHasSavingsBudget(selection);
    setShowSetAsideInput(selection === "Yes");
    setShowProvidedInput(selection === "No");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const userId = localStorage.getItem('userId');
      await axios.post(`${remoteHostURL}/budget`, {
        userId: userId,
        earnings: earnings,
        budget: budget
      }, config);

      await axios.post(`${remoteHostURL}/balance`, {
        userId: userId,
        balance: balance
      }, config);

    } catch (error) {
      console.log(error)
    }
 
    if (
      (showPaydayInput && !event.target.payday.value) ||
      !event.target.earnings.value ||
      !event.target.balance.value ||
      (showSetAsideInput && !event.target.setAside.value) ||
      (showProvidedInput && !event.target.provided.value)
    ) {
      setErrorMessage("Please fill out all required fields.");
    } else {
      setErrorMessage("");
      nav('/onboard/2'); 
    }
  };

  return (
    <div className="haha">
      <h1 style={{ textAlign: "center" }}>Optimize Your Experience</h1>
      {errorMessage && <p style={{ color: "white", textAlign: "center", fontWeight:"bolder" }}>{errorMessage}</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="lol">
            <label>What is your employment status?</label>
            <select onChange={handleEmploymentStatusChange}>
              <option></option>
              <option>Working part time</option>
              <option>Working full time</option>
              <option>Unemployed</option>
            </select>
          </div>
        </div>

        {showPaydayInput && (
          <div className="form-group">
            <div className="lol">
              <label>On what day do you usually get paid?</label>
              <input type="date" name="payday" />
            </div>
          </div>
        )}

        <div className="form-group">
          <div className="lol">
            <label>What is your total earnings per week?</label>
            <input name="earnings" 
            value={earnings}
            onChange={(e) => setEarnings(e.target.value)}/>
          </div>
        </div>

        <div className="form-group">
          <div className="lol">
            <label>What is your current account balance?</label>
            <input name="balance" 
            value={balance}
            onChange={(e) => setBalance(e.target.value)}/>
          </div>
        </div>

        <div className="form-group">
          <div className="lol">
            <label>Do you have a set savings budget?</label>
            <select onChange={handleSavingsBudgetChange}>
              <option></option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        {showSetAsideInput && (
          <div className="form-group">
            <div className="lol">
              <label>How much do you plan to set aside?</label>
              <input name="setAside" 
              value={budget}
              onChange={(e) => setBudget(e.target.value)}/>
            </div>
          </div>
        )}

        {showProvidedInput && (
          <div className="form-group">
            <div className="lol">
              <label>Would you like to be provided with one?</label>
              <select>
              <option></option>
              <option>Yes</option>
              <option>No</option>
            </select>
            </div>
          </div>
        )}

        <button type="submit" className="login-btn">Next</button>
      </form>
      
    </div>
  );
};

export default OnboardForm;
