import "./Header.css"
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, getUser, logOut } from "../../utilities/user-service";


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
        <Link to="/cart"><i class="fa fa-shopping-cart"></i></Link>
      </nav>
    </header>     
  );
}
  
// export default Header;