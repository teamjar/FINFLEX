import "./Bills.css"
import Navbar from '../Navbar/Navbar'
import PersonalSide from "../PersonalSide/PersonalSide"


const Bills = () => {
    return (
        <div className="personal">
            <div className="random">
            <PersonalSide />
            </div>
            <div className="plz">
            <Navbar />
        <div className="top">
            <div className="welcome">
            <h2 style={{color:"#031D44"}}>View Your Bills, Hardcoded Name</h2>
            </div>
            
            <div className="top1">
            <div className="search-bar">
                <input type="text" className="enter" placeholder="Search for transactions and more" />
                <button type="submit" className="btn">Search</button>
            </div>
            <div className="pic2">
            <img style={{width:"40px", marginLeft:"10px", padding:"10px"}} src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png" />
            </div>
            <div className="pic2">
            <img style={{width:"50px", marginRight:"10px", padding:"10px"}} src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png" />
            </div>
            </div>
        </div>
        <div className="tiles2">
        <h1 className="bruh">Got Bills?</h1>
        <h3 style={{color:"white"}}>View and manage all of your bills to keep them in check.</h3>
        </div>

        
     

        

        </div>
    </div>
    )
 }

 export default Bills;