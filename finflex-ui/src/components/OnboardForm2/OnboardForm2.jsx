import { useState } from "react";
import "./OnboardForm2.css";
import { useNavigate } from "react-router-dom";

const OnboardForm2 = () => {
  const [hasFinancialGoals, setHasFinancialGoals] = useState("");
  const [numberOfGoals, setNumberOfGoals] = useState(0);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleGoalSelection = (event) => {
    setHasFinancialGoals(event.target.value);
    if (event.target.value === "No") {
      setNumberOfGoals(0);
    }
  };

  const handleNumberOfGoals = (event) => {
    setNumberOfGoals(parseInt(event.target.value));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (hasFinancialGoals === "Yes" && numberOfGoals > 0) {
      // Check if all the forms are filled out for visible questions
      let errorFound = false;
      for (let i = 0; i < numberOfGoals; i++) {
        const goalName = document.getElementById(`goalName-${i}`).value;
        const description = document.getElementById(`description-${i}`).value;
        const goalAmount = document.getElementById(`goalAmount-${i}`).value;
        const dueDate = document.getElementById(`dueDate-${i}`).value;
        const category = document.getElementById(`category-${i}`).value;

        if (
          !goalName.trim() ||
          !description.trim() ||
          !goalAmount.trim() ||
          !dueDate.trim() ||
          !category.trim()
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

    setError(""); 
    nav("/onboard/3");
  };

  return (
    <div className="haha">
      <h1 style={{ textAlign: "center" }}>Optimize Your Experience</h1>
      {error && <div className="error-message" style={{fontWeight:'bolder', margin:"5px", padding:"5px"}}>{error}</div>}
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
                    <input id={`goalName-${index}`} />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>Provide a short description</label>
                    <input id={`description-${index}`} />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>What is your intended goal amount?</label>
                    <input id={`goalAmount-${index}`} />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>By when do you want this to be due?</label>
                    <input type="date" id={`dueDate-${index}`} />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>What category does this fall under?</label>
                    <select id={`category-${index}`}>
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
