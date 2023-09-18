import OrderComponent from "../../components/Order/OrderComponent";
import "./Cart.css"
import {Link} from 'react-router-dom'


export function Cart(props){
    return (
        <>
        <h2>Items in Cart</h2>
    <div className='cart-layout'>
        <OrderComponent mode="cart" />
    </div>
    <br />
    <br />
    <div>
        <Link to='/checkout'><button className="cart-btn">Checkout</button></Link>
    </div>
    </>
    )
}
