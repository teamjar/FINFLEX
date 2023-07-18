import "./PersonalDashboard.css"
import Navbar from '../Navbar/Navbar'
import InfoTile from "../InfoTile/InfoTile"

const PersonalDashboard = () => {
    return (
        <div className="personal">
            <Navbar />
        <div className="top">
            <div className="welcome">
            <h2 style={{color:"#031D44"}}>Hello, Hardcoded Name</h2>
            </div>
            
            <div className="top1">
            <div className="search-bar">
                <input type="text" placeholder="Search for transactions and more" />
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
        <InfoTile />

        </div>

    )
 }

 export default PersonalDashboard;