import { useEffect, useState } from "react";
import { getCart } from "../../utilities/orders-api";
import OrderItem from "./OrderItem";

export default function OrderComponent({ mode }) {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cart = await getCart();
                setCart(cart);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCart();
    }, []);
    const orderItems = cart.orderItems.map(orderItem => {
        return <OrderItem
            orderItem={orderItem}
            isPaid={cart.isPaid}
            key={orderItem._id} />
    })
    return (
        <>
            {
                mode === "cart" &&
                <>
                    {

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