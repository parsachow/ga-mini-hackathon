import "./Header.css"
import React from 'react';
import { Link } from 'react-router-dom';


export function Header(props) {    
  return (    
    <header>      
      <nav className="navbar">      
        <Link to="/signin"><button className="signIn">Sign In</button></Link>
        <Link to="/cart"><i class="fa fa-shopping-cart"></i></Link>
      </nav>
    </header>     
  );
}
  
// export default Header;