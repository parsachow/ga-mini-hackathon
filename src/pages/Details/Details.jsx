import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import './Details.css';
import { addItemToCart } from "../../utilities/orders-api";
import Counter from "../../components/Counter/Counter";

export function Details() {
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  // fetch menuItem && profile

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/menu/${id}`);
        const json = await res.json();
        setItem(json);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [id]);

  const handleQtyChange = qty =>{
    setQty(qty);
  }

  return (
    item &&
    <div>
      <div className="item-details__img" style={{ backgroundImage: `url("${item.imageUrl}")` }}>
      </div>
      <div className="item-details__container">
        <div className="item-details__container__upper">
          <div className="item-details__container__upper--name">{item.name}</div>
          <div className="item-details__container__upper--description">
            <div className="item-details__container__upper--description--header">Description</div>
            <div className="item-details__container__upper--description--text">{item.description}</div>
          </div>
          <div className="item-details__container__upper--order-details">
            <div className="item-details__container__upper--order-details--subtotal">
              <Counter onChange={handleQtyChange} />
              <div className="item-details__container__upper--order-details--subtotal--price">${item.price}</div>
            </div>
            <div className="item-details__container__upper--order-details--notes"></div>
          </div>
        </div>

      </div>
    </div>

  );
}