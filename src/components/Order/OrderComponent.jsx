import { useEffect, useState } from "react";
import { getCart } from "../../utilities/orders-api";
import OrderItem from "./OrderItem";

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
    const orderItems = cart.orderItems ? cart.orderItems.map(orderItem => {
        return <OrderItem
            orderItem={orderItem}
            isPaid={cart.isPaid}
            key={orderItem._id} />
    }) : '';
    return (
        <>
            {
                mode === "cart" &&
                <>
                    {
                        !!orderItems.length && orderItems
                    }
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