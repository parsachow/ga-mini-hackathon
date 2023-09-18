import { useEffect, useState } from "react";
import { getCart, setItemQtyInCart } from "../../utilities/orders-api";
import OrderItem from "./OrderItem";
import './OrderComponent.css';

export default function OrderComponent({ mode }) {
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

    const handleChangeQty = async (item, qty) => {
        const cart = await setItemQtyInCart(item, qty);
        setCart(cart);
    }

    const orderItems = cart.orderItems ? cart.orderItems.map(orderItem => {

        return <OrderItem
            orderItem={orderItem}
            isPaid={cart.isPaid}
            handleChangeQty={handleChangeQty}
            key={orderItem._id} />
    }) : '';



    return (
        <>
            {
                mode === "cart" &&
                <>
                    <div className="order__summary">
                        {
                            !!orderItems.length &&
                             orderItems 

                        }
                        {
                            !!orderItems.length &&
                            <>
                                <div className="cart__actions">
                                    <span>Total: </span><span>$ {cart.orderTotal}</span>
                                </div>
                            </>
                        }
                    </div>
                </>
            }
            {
                mode === "checkout" &&
                <>
                </>
            }
            {mode === "summary" &&
                <>
                </>
            }
        </>
    );
}