import "./Header.css"
import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    
  return (
    <div>
      <header>      
        <nav className="navbar">
          <Link to="/cart"><i class="fa fa-shopping-cart"></i></Link>
        </nav>
      </header> 
    </div>
  );
}
  
export default Header;