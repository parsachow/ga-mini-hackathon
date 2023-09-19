import './SidebarNav.css'
import React, {useState}  from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";


function Navbar() {
    const [sidebar, setSidebar] = useState(false);
  
    const showSidebar = () => setSidebar(!sidebar);
  
    return (
      <>
        <IconContext.Provider value={{ color: "undefined" }}>
          <div className="navbar">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
              </li>
              <Link to="/"><button className='nav-btn'>Home</button> </Link>
              <br />
              <Link to="/favorites"><button className='nav-btn'>Favorites</button> </Link>
              <br />
              <Link to="/orders"><button className='nav-btn'>Orders</button> </Link>
              <br />
              <Link to="/settings"><button className='nav-btn'>Account Setting</button> </Link>
              <br />
              <Link to="/"><button className='nav-btn'>Call Us</button> </Link>
              
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
  
  export default Navbar;