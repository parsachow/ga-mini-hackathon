import "./Header.css"
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, logOut } from "../../utilities/user-service";
import Navbar from "../SidebarNav/SidebarNav";


export function Header({ cart }) {
  const [jwt, setJwt] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    if (jwt) {
      if (!getToken()) setJwt(null);
    } else {
      if (getToken()) setJwt(getToken());
    }
  }, [jwt]);


  const logout = () => {
    logOut();
    setJwt(getToken());
    navigate('/');
  }


  return (
    <header>
      <nav className="navbar-header">
        <span className="cart-container">
          <Link to="/cart"><svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="title-cart" className="bi bi-cart" viewBox="0 0 16 16"> <title id='title-cart'>Shopping Cart</title> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> </svg></Link>
          {cart &&
            cart.orderItems &&
            cart.orderItems.length &&
            <div className="cart-badge">{cart.orderItems.reduce((acc, el) => acc + el.quantity, 0)}</div>}
        </span>
        <span>
          {!jwt && <Link to="/signin"><svg xmlns="http://www.w3.org/2000/svg" className='user-icon' aria-labelledby="title-profile" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <title id='title-profile'>Profile Settings</title> <path d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" /> </g> </svg></Link>}
          {jwt && <Link to="" onClick={logout}><button className="signIn">Sign Out</button></Link>}
        </span>
        <div className="title">
          <Link to='/' className="app-title">Cafe Normalé</Link>
        </div>
        <div>
          <Navbar />
        </div>

      </nav>
    </header>
  );
}
