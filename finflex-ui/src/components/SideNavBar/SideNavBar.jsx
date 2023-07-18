import { Link } from 'react-router-dom'

function SideNavBar() {
  return (
    <div className="side-navbar">
      <h1>FinFlex</h1>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/stocks">My Stocks</Link></li>
        <li><Link to="/watchlist">Watch List</Link></li>
      </ul>
    </div>
  );
}

export default SideNavBar;

