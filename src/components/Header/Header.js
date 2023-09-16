import "./Header.css"
import React from 'react';

function Header(props) {
    
  return (
    <div>
      <header>      
        <nav className="navbar">
          <div className="cart"><i class="fa fa-shopping-cart"></i></div>
        </nav>
      </header> 
    </div>
  );
}
  
export default Header;