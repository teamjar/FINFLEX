import { useState } from "react";
import "./OnboardForm2.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { remoteHostURL } from "../../apiClient";

const OnboardForm2 = () => {
  const [hasFinancialGoals, setHasFinancialGoals] = useState("");
  const [numberOfGoals, setNumberOfGoals] = useState(0);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate(); // Use a different variable name for the navigate function

  const handleGoalSelection = (event) => {
    setHasFinancialGoals(event.target.value);
    if (event.target.value === "No") {
      setNumberOfGoals(0);
    }
  };

  const handleNumberOfGoals = async (event) => {
    setNumberOfGoals(parseInt(event.target.value));
  };

  const handleChange = (event, field, index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${field}-${index}`]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (hasFinancialGoals === "Yes" && numberOfGoals > 0) {
      // Check if all the forms are filled out for visible questions
      let errorFound = false;
      for (let i = 0; i < numberOfGoals; i++) {
        const goalName = formData[`goalName-${i}`];
        const description = formData[`description-${i}`];
        const goalAmount = formData[`goalAmount-${i}`];
        const dueDate = formData[`dueDate-${i}`];
        const category = formData[`category-${i}`];

        if (
          !goalName?.trim() ||
          !description?.trim() ||
          !goalAmount?.trim() ||
          !dueDate?.trim() ||
          !category?.trim()
        ) {
          errorFound = true;
          break;
        }
      }

      if (errorFound) {
        setError("Please fill out all the form fields.");
        return;
      }
    }

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
      const userId = localStorage.getItem('userId');
      for (let i = 0; i < numberOfGoals; i++) {
        const goalName = formData[`goalName-${i}`];
        const description = formData[`description-${i}`];
        const goalAmount = formData[`goalAmount-${i}`];
        const dueDate = formData[`dueDate-${i}`];
        const category = formData[`category-${i}`];

        await axios.post(`${remoteHostURL}/goals`, {
          userId: userId,
          gName: goalName,
          gDesc: description,
          target: goalAmount,
          dateDue: dueDate,
          category: category
        }, config);
      }
    } catch (err) {
      console.log(err);
    }

    setError("");
    navigate("/onboard/3"); // Navigate to the next step after successful form submission
  };

  const handleGoBack = () => {
    navigate("/onboard"); // Navigate back to "/onboard" route
  };

  return (
    <div className="haha">
      <h1 style={{ textAlign: "center" }}>Optimize Your Experience</h1>
      {error && <div className="error-message" style={{ fontWeight: 'bolder', margin: "5px", padding: "5px" }}>{error}</div>}
      <form
        className="login-form1"
        style={{ width: hasFinancialGoals === "Yes" ? "1500px" : "300px" }}
      >
        <div className="form-group">
          <div className="lol">
            <label>Do you have any current financial goals?</label>
            <select onChange={handleGoalSelection}>
              <option value="none" selected disabled hidden>Select an Option</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        {hasFinancialGoals === "Yes" && (
          <div>
            <div className="form-group">
              <div className="lol">
                <label>How many do you have?</label>
                <input type="number" min="1" onChange={handleNumberOfGoals} />
              </div>
            </div>

            {Array.from({ length: numberOfGoals }).map((_, index) => (
              <div key={index} className="abc">
                <div className="form-group">
                  <div className="lol">
                    <label>What is the name of your goal?</label>
                    <input
                      value={formData[`goalName-${index}`] || ""}
                      onChange={(e) => handleChange(e, 'goalName', index)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>Provide a short description</label>
                    <input
                      value={formData[`description-${index}`] || ""}
                      onChange={(e) => handleChange(e, 'description', index)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>What is your intended goal amount?</label>
                    <input
                      value={formData[`goalAmount-${index}`] || ""}
                      onChange={(e) => handleChange(e, 'goalAmount', index)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>By when do you want this to be due?</label>
                    <input
                      type="date"
                      value={formData[`dueDate-${index}`] || ""}
                      onChange={(e) => handleChange(e, 'dueDate', index)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>What category does this fall under?</label>
                    <select
                      value={formData[`category-${index}`] || ""}
                      onChange={(e) => handleChange(e, 'category', index)}
                    >
                      <option></option>
                      <option value="Food">Food</option>
                      <option value="Housing">Housing</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Education">Education</option>
                      <option value="Health/Medical">Health/Medical</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Personal">Personal Care</option>
                      <option value="Debt/Loans">Debt/Loans</option>
                      <option value="Bills">Bills</option>
                      <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


     
          <button className="login-btn" onClick={handleSubmit}>
            Next
          </button>
       

      </form>
    </div>
  );
};

export default OnboardForm2;
