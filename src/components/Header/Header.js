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
    window.location.href = window.location.href;
  }
  return (
    <header>
      <nav className="navbar-header">
        <div>
          <span className="cart-container">
            <Link to="/cart"><svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="title-cart" className="bi bi-cart" viewBox="0 0 16 16"> <title id='title-cart'>Shopping Cart</title> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> </svg></Link>
            {cart &&
              cart.orderItems &&
              cart.orderItems.length &&
              <div className="cart-badge">{cart.orderItems.reduce((acc, el) => acc + el.quantity, 0)}</div>}
          </span>
          <span>
            {!jwt && <Link to="/signin"><svg xmlns="http://www.w3.org/2000/svg" className='user-icon' aria-labelledby="title-profile" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z" /> <title id='title-profile'>Profile Settings</title> <path d="M20 22H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2zm-8-9a6 6 0 1 1 0-12 6 6 0 0 1 0 12z" /> </g> </svg></Link>}
            {jwt && <Link to="" onClick={logout}><svg className='logout-profile' aria-labelledby="title-logout" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg"><title id='title-logout'>Logout</title>
              <path d="M18.4999 18.4989C23.2437 18.4989 27.0892 14.6533 27.0892 9.9096C27.0892 5.16587 23.2437 1.32031 18.4999 1.32031C13.7562 1.32031 9.91064 5.16587 9.91064 9.9096C9.91064 14.6533 13.7562 18.4989 18.4999 18.4989Z" stroke="#000001" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M34.8327 35.68C33.7232 32.2202 31.5436 29.202 28.6082 27.0607C25.6728 24.9194 22.1333 23.7656 18.4998 23.7656C14.8664 23.7656 11.3269 24.9194 8.39149 27.0607C5.4561 29.202 3.27652 32.2202 2.16699 35.68H34.8327Z" stroke="#000001" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg></Link>}
          </span>
        </div>
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