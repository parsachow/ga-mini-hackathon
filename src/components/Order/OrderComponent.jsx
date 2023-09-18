import { useEffect, useState } from "react";
import { getCart } from "../../utilities/orders-api";

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
    return (
        <>
            {
                mode === "cart" &&
                <>
                    {
                        cart.orderItems.length && cart.orderItems.map((orderItem) => {
                            return (
                                <>
                                    <div>{orderItem.menuItem.name}</div>
                                    <div>{orderItem.quantity}</div>
                                </>
                            );
                        })
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