import "./Header.css"
import React from 'react';
import { Link } from 'react-router-dom';

export function Header(props) {    
  return (    
    <header>      
      <nav className="navbar">
        <Link to="/cart"><i class="fa fa-shopping-cart"></i></Link>
      </nav>
    </header>     
  );
}
  
// export default Header;