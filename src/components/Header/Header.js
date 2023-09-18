import "./Header.css"
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, logOut } from "../../utilities/user-service";


export function Header(props) {  
  const [jwt, setJwt] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    if(jwt){
      if(!getToken()) setJwt(null);
    }else{
      if(getToken()) setJwt(getToken());
    }
  },[jwt]);

  const logout = () =>{
    logOut();
    setJwt(getToken());
    navigate('/');
  }

  return (    
    <header>      
      <nav className="navbar">      
        {!jwt && <Link to="/signin"><button className="signIn">Sign In</button></Link>}
        {jwt && <Link to="" onClick={logout}><button className="signIn">Sign Out</button></Link>}
        <Link to="/cart"><svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="title-cart" className="bi bi-cart3" viewBox="0 0 16 16"><title id='title-cart'>Shopping Cart</title> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/> </svg></Link>
      </nav>
    </header>     
  );
}
  
// export default Header;