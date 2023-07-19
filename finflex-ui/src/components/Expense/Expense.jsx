
import "./Expense.css"

export default function Expense() {
  return (
    <div className="add-transaction">
      <ExpenseForm />
    </div>
  )
}

export function ExpenseForm() {
  return (
    <div>
    <div className="flow">

    <div className="si"> 
      <label className="ti">Name</label>
      <input className="el" placeholder="Enter name of purchase"/>
    </div>

    <div className="si"> 
        <label className="ti">Description</label>
          <input className="el" placeholder="Enter a description"/>
    </div>

    <div className="si"> 
          <label className="ti">Amount</label>
          <input className="el" placeholder="Enter paid amount"/>
    </div>

    <div className="si"> 
          <label className="ti">Date</label>
          <input className="el" type="date"/>
    </div>
    <button type="submit" className="btn2" style={{width:"90.27px", height:"38.07px"}}>Add</button>
    </div>
    </div>
  )
}