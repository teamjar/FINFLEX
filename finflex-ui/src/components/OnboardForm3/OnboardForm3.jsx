import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { remoteHostURL } from "../../apiClient";

const OnboardForm3 = () => {
  const [hasFinancialGoals, setHasFinancialGoals] = useState("");
  const [numberOfGoals, setNumberOfGoals] = useState(0);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({});
  const navigate1 = useNavigate();

  const handleGoalSelection = (event) => {
    setHasFinancialGoals(event.target.value);
    if (event.target.value === "No") {
      setNumberOfGoals(0);
    }
  };

  const handleNumberOfGoals = (event) => {
    setNumberOfGoals(parseInt(event.target.value));
  };

  const handleChange = (event, field) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    
    if (hasFinancialGoals === "Yes" && numberOfGoals > 0) {
      // Check if all the forms are filled out for visible questions
      let errorFound = false;
      for (let i = 0; i < numberOfGoals; i++) {
        const billName = formData[`billName-${i}`];
        const description = formData[`description-${i}`];
        const dueAmount = formData[`dueAmount-${i}`];
        const dueDate = formData[`dueDate-${i}`];

        if (!billName?.trim() || !description?.trim() || !dueAmount?.trim() || !dueDate?.trim()) {
          errorFound = true;
          break;
        }
      }

      if (errorFound) {
        setError("Please fill out all the form fields for visible questions.");
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
        const billName = formData[`billName-${i}`];
        const description = formData[`description-${i}`];
        const dueAmount = formData[`dueAmount-${i}`];
        const dueDate = formData[`dueDate-${i}`];

        await axios.post(`${remoteHostURL}/api/bills`, {
          userId: userId,
          billName: billName,
          billDesc: description,
          due: dueDate,
          status: "Unpaid",
          price: dueAmount
        }, config);
      }
    } catch(err) {
      console.log(err);
    }

    setError(""); // Clear any previous error
    navigate1("/personal");
  };

  const handleGoBack = () => {
    navigate1("/onboard/2"); // Navigate back to "/onboard" route
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
                    <input
                      value={formData[`billName-${index}`] || ""}
                      onChange={(e) => handleChange(e, `billName-${index}`)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>Provide a short bill description</label>
                    <input
                      value={formData[`description-${index}`] || ""}
                      onChange={(e) => handleChange(e, `description-${index}`)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>What is your due amount?</label>
                    <input
                      value={formData[`dueAmount-${index}`] || ""}
                      onChange={(e) => handleChange(e, `dueAmount-${index}`)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="lol">
                    <label>When is this bill due?</label>
                    <input
                      type="date"
                      value={formData[`dueDate-${index}`] || ""}
                      onChange={(e) => handleChange(e, `dueDate-${index}`)}
                    />
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
