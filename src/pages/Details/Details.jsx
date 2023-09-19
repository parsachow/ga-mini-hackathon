import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMeal } from '../../utilities/meal-service'
import './Details.css'
import sendRequest from "../../utilities/send-request";
import { addItemToCart } from "../../utilities/orders-api";

export function Details() {
  const [item, setItem] = useState(null);
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
  return (
    item &&
    <div>
      <div className="item-details__img" style={{ backgroundImage: `url("${item.imageUrl}")` }}>
      </div>
      <div className="item-details__container">
        <div className="item-details__container__upper">
          <div className="item-details__container__upper--name">{item.name}</div>
          <div className="item-details__container__upper--description">
            <span className="item-details__container__upper--description--header">Description</span>
            <span className="item-details__container__upper--description--text"></span>
          </div>
          <div className="item-details__container__upper--order-details">
            <div className="item-details__container__upper--order-details--subtotal"></div>
            <div className="item-details__container__upper--order-details--notes"></div>
          </div>
        </div>

      </div>
    </div>

  );
}