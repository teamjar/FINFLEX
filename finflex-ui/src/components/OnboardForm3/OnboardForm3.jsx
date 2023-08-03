import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OnboardForm3 = () => {
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
        const billName = document.getElementById(`billName-${i}`).value;
        const description = document.getElementById(`description-${i}`).value;
        const dueAmount = document.getElementById(`dueAmount-${i}`).value;
        const dueDate = document.getElementById(`dueDate-${i}`).value;

        if (!billName.trim() || !description.trim() || !dueAmount.trim() || !dueDate.trim()) {
          errorFound = true;
          break;
        }
      }

      if (errorFound) {
        setError("Please fill out all the form fields for visible questions.");
        return;
      }
    }

    setError(""); // Clear any previous error
    nav("/personal");
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
            <label>Do you have any current unpaid bills?</label>
            <select onChange={handleGoalSelection}>
            <option selected disabled hidden>Select an Option</option>
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
                    <label>What is the name of your bill?</label>
                    <input id={`billName-${index}`} />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>Provide a short bill description</label>
                    <input id={`description-${index}`} />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>What is your due amount?</label>
                    <input id={`dueAmount-${index}`} />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>When is this bill due?</label>
                    <input type="date" id={`dueDate-${index}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button className="login-btn" onClick={handleSubmit}>
          Finish
        </button>
      </form>
    </div>
  );
};

export default OnboardForm3;
