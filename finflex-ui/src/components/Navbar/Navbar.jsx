import "./Navbar.css"

const Navbar = () => {

    return (
      <nav className="navbar">
        <div className="navbar__container">
        <img className="pic" src="https://cdn.freebiesupply.com/logos/large/2x/starbucks-coffee-logo-black-and-white.png" />
          <div className="navbar__item">Personal</div>
          <div className="navbar__item">Stocks</div>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
