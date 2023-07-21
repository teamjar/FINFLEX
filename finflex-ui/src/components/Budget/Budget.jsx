
import "./Budget.css"

export default function Budget() {
  return (
    <div className="add-transaction">
      <BudgetForm />
    </div>
  )
}

export function BudgetForm() {
  return (
    <div>
    <div className="flow">

    <div className="si"> 
      <label className="ti">Weekly Earnings</label>
      <input className="el2" placeholder="Enter your weekly earnings"/>
    </div>

    <div className="si"> 
        <label className="ti">Set Aside</label>
          <input className="el2" placeholder="Enter a budget amount"/>
    </div>

   
    <button type="submit" className="btn2">Set</button>
    </div>
    </div>
  )
}