import "./Footer.css"
import React from 'react';
import { Link } from 'react-router-dom';

export function Footer(props) {    
  return (
    <footer> 
        <Link to="/"><i class="fa fa-home"></i></Link>
        <Link to="/favorites"><i class="fa fa-heart"></i></Link>     
        <Link to="/settings"><i class="fa fa-gear"></i></Link>
    </footer> 
    
  );
}
  
// export default Footer;