import { useEffect, useState } from "react";
import { getCart, setItemQtyInCart } from "../../utilities/orders-api";
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

    const handleChangeQty = async (item, qty) => {
        const cart = await setItemQtyInCart(item,qty);
        console.log('changing qty');
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