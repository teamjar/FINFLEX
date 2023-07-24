import "./Expense.css";

export default function Expense() {
  return (
    <div className="add-transaction">
      <ExpenseForm />
    </div>
  );
}

export function ExpenseForm() {
  return (
    <div>
      <div className="flow">
        <div className="si">
          <label className="ti">Name</label>
          <input
            className="el"
            placeholder="Enter name of purchase"
            name="pName"
          />
        </div>

        <div className="si">
          <label className="ti">Description</label>
          <input
            className="el"
            placeholder="Enter a description"
            name="pDescription" 
          />
        </div>

        <div className="si">
          <label className="ti">Amount</label>
          <input
            className="el"
            placeholder="Enter paid amount"
            name="pPrice" 
          />
        </div>

        <div className="si">
          <label className="ti">Date</label>
          <input
            className="el"
            type="date"
            name="pDate" 
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
