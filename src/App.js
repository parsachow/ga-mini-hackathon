import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Home} from "./pages/Home/Home"
import {Settings} from "./pages/Settings/Settings"
import {Menu} from "./pages/Menu/Menu"
import {SignIn} from "./pages/SignIn/SignIn"
import {SignUp} from "./pages/SignUp/SignUp"
import {Cart} from "./pages/Cart/Cart"
import {Checkout} from "./pages/Checkout/Checkout"
import {Details} from "./pages/Details/Details"
import {Favorites} from "./pages/Favorites/Favorites"
import {Summary} from "./pages/Summary/Summary"

import { Route, Routes } from "react-router-dom";
import './App.css';
import LoginSuccess from "./components/LoginSuccess/LoginSuccess";
import TestPage from "./pages/TestPage";


function App() {
  const URL = "http://localhost:4000/menu";
  return (
    <div className="App">

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/settings" element={<Settings/>} />
          <Route exact path="/menu" element={<Menu URL={URL} />} />
          <Route exact path="/signIn" element={<SignIn />} />
          <Route exact path="/signUp" element={<SignUp />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/menu/:id" element={<Details />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/summary" element={<Summary />} />
          <Route exact path="/auth/login-success/:token" element={<LoginSuccess />} />
          <Route path='/test' element={<TestPage />} />
        </Routes>

    </div>
  );
}

export default App;
