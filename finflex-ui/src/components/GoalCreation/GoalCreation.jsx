
import "./GoalCreation.css"

export default function GoalCreation() {
  return (
    <div className="add-transaction">
      <GoalCreationForm />
    </div>
  )
}

export function GoalCreationForm() {
  return (
    <div>
    <div className="flow">

    <div className="si"> 
      <label className="ti">Goal Name</label>
      <input className="el" placeholder="Enter a name for your goal"/>
    </div>

    <div className="si"> 
        <label className="ti">Description</label>
          <input className="el" placeholder="Enter a short goal description"/>
    </div>

    <div className="si"> 
        <label className="ti">Amount</label>
          <input className="el" placeholder="Enter a specific goal amount"/>
    </div>

    <div className="si"> 
        <label className="ti">Deadline</label>
          <input className="el" type="datetime-local" placeholder="Enter a deadline"/>
    </div>

   
    <button type="submit" className="btn2">Add</button>
    </div>
    </div>
  )
}