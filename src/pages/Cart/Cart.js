import MenuItem from "../../components/MenuItem/MenuItem"
import "./Cart.css"
import {Link} from 'react-router-dom'
import { useEffect, useState } from "react"
import { getCart } from "../../utilities/orders-api"




export function Cart(props){
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cart = await getCart();
                console.log(cart);
                setCart(cart);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCart();
    }, []);
    return (
        <>
        <h2>Items in Cart</h2>
        <div className='cart-layout'>
           {cart && cart.map(item => {
            return MenuItem.name
           } )}
        </div>
        <br />
        <br />
        <div className="buttons">
            <Link to='/checkout'><button className="cart-btn">Checkout</button></Link>
            <br />
            <br />
            <Link to='/'><button className="cart-btn">Add More Items</button></Link>
         </div>
    </>
    )
}
