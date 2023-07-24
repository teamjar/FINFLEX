import "./GoalCreation.css";

export default function GoalCreation() {
  return (
    <div className="add-transaction">
      <GoalCreationForm />
    </div>
  );
}

export function GoalCreationForm() {
  return (
    <div>
      <div className="flow">
        <div className="si">
          <label className="ti">Goal Name</label>
          <input
            className="el"
            placeholder="Enter a name for your goal"
            name="gName"
          />
        </div>

        <div className="si">
          <label className="ti">Description</label>
          <input
            className="el"
            placeholder="Enter a short goal description"
            name="gDesc"
          />
        </div>

        <div className="si">
          <label className="ti">Amount</label>
          <input
            className="el"
            placeholder="Enter a specific goal amount"
            name="target" 
          />
        </div>

        <div className="si">
          <label className="ti">Deadline</label>
          <input
            className="el"
            type="datetime-local"
            placeholder="Enter a deadline"
            name="dateDue"
          />
        </div>

        <div className="si">
          <label className="ti">Category</label>
          <select id="status" name="category">
          <option value="food">Food</option>
            <option value="housing">Housing</option>
            <option value="transportation">Transportation</option>
            <option value="education">Education</option>
            <option value="health">Health/Medical</option>
            <option value="entertainment">Entertainment</option>
            <option value="personal">Personal Care</option>
            <option value="debt">Debt/Loans</option>
            <option value="misc">Miscellaneous</option>
            
          </select>
        </div>

        <button type="submit" className="btn2">
          Add
        </button>
      </div>
    </div>
  );
}
