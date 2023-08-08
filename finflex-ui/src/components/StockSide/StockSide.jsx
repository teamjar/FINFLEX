import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import "./StockSide.css"

function StockSide() {
  const nav = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("name");
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiredTime');
    nav('/');
  }

  return (
    <div className="stock-side">
      <h2 style={{color:"#031D44", textAlign:"center", fontSize:"30px"}}>FinFlex</h2>
      <ul>
        <div className='navigation-route'>
        <img className='dashboard' src="https://clipart-library.com/newhp/kissclipart-dashboard-icon-png-clipart-computer-icons-dashboar-dcb8014117ab1ea8.png" />
        <li><Link to="/stocks" style={{color:"#031D44"}}>Dashboard</Link></li>
        </div>

        <div className='navigation-route'>
        <img className='my-stocks' src="https://www.pngarts.com/files/17/Finance-Silhouette-PNG-Picture.png"/>
        <li><Link to="/watchlist" style={{color:"#031D44"}}>Watch List</Link></li>
        </div>

        <div className='navigation-route'>
        <img className='watch-list' style={{width:"30px"}} src="https://static.thenounproject.com/png/2989017-200.png" />
        <li><Link to="/news" style={{color:"#031D44"}}>News Feed</Link></li>
        </div>

        {/* <div className='navigation-route'>
        <img className='icon2' src="https://upload.wikimedia.org/wikipedia/commons/f/f8/Question_mark_alternate.svg" />
        <li><Link to="/help" style={{color:"#031D44"}}>Ask Help</Link></li>
        </div> */}

        <div className='navigation-route' style={{position:"absolute", bottom:"0"}}>
        <img className='icon3' src="https://static-00.iconduck.com/assets.00/log-out-icon-2048x2048-cru8zabe.png" />
        <li><Link onClick={handleLogOut} to={'/'}  style={{color:"#031D44"}}>Log Out</Link></li>
        </div>

      </ul>
    </div>
  );
}

export default StockSide;
