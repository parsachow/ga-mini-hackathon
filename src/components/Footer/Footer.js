import "./Footer.css"
import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    
  return (
    <div>
      <footer> 
        <Link to="/"><i class="fa fa-home"></i></Link>
        <Link to="/favorites"><i class="fa fa-heart"></i></Link>     
        <Link to="/settings"><i class="fa fa-gear"></i></Link>
      </footer> 
    </div>
  );
}
  
export default Header;