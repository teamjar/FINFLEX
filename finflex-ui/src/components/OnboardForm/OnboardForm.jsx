import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./OnboardForm.css";
import axios from 'axios';
import { remoteHostURL } from "../../apiClient";

const OnboardForm = () => {
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [hasSavingsBudget, setHasSavingsBudget] = useState("");
  const [earnings, setEarnings] = useState(0);
  const [budget, setBudget] = useState(0);
  const [balance, setBalance] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const nav = useNavigate();

  const handleEmploymentStatusChange = (event) => {
    const status = event.target.value;
    setEmploymentStatus(status);
  };

  const handleSavingsBudgetChange = (event) => {
    const selection = event.target.value;
    setHasSavingsBudget(selection);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the values from the form
    const earningsValue = parseFloat(event.target.earnings.value);
    const balanceValue = parseFloat(event.target.balance.value);
    const setAsideValue = parseFloat(event.target.setAside.value);

    // Check if the user entered a value greater than 0 for earnings, balance, and budget
    if (earningsValue <= 0) {
      setErrorMessage("Please enter a value greater than 0 for earnings.");
    } else if (balanceValue <= 0) {
      setErrorMessage("Please enter a value greater than 0 for account balance.");
    } else if (hasSavingsBudget === "Yes" && setAsideValue <= 0) {
      setErrorMessage("Please enter a value greater than 0 for budget.");
    } else {
      // Reset error message
      setErrorMessage("");

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const userId = localStorage.getItem('userId');
        await axios.post(`${remoteHostURL}/api/budget`, {
          userId: userId,
          earnings: earningsValue,
          budget: setAsideValue
        }, config);

        await axios.post(`${remoteHostURL}/api/balance`, {
          userId: userId,
          balance: balanceValue
        }, config);

        // If everything is fine, navigate to the next page
        nav('/onboard/2');
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <div className="haha">
      <h1 style={{ textAlign: "center" }}>Optimize Your Experience</h1>
      {errorMessage && <p style={{ color: "white", textAlign: "center", fontWeight: "bolder" }}>{errorMessage}</p>}
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

        <div className="form-group">
          <div className="lol">
            <label>What is your total earnings per week?</label>
            <input
              name="earnings"
              value={earnings}
              onChange={(e) => setEarnings(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="lol">
            <label>What is your current account balance?</label>
            <input
              name="balance"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="lol">
            <label>How much do you plan to budget weekly?</label>
            <input
              name="setAside"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
        </div>

        
        <button type="submit" className="login-btn">Next</button>
      </form>
    </div>
  );
};

export default OnboardForm;
