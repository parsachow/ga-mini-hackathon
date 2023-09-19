import sendRequest from './send-request';

const BASE_URL = "http://localhost:4000/orders"


export const addItemToCart = async (itemId, qty = 1) => {
    return await sendRequest(`${BASE_URL}/cart/items/${itemId}`, "post", { quantity: qty });
}

export const getCart = async () => {
    return await sendRequest(`${BASE_URL}/cart`);
}

export const setItemQtyInCart = async (itemId, qty) => {
    return await sendRequest(`${BASE_URL}/cart/qty`, 'PUT', { itemId, newQty: qty });
}