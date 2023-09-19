import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import './Details.css';
import { addItemToCart } from "../../utilities/orders-api";
import Counter from "../../components/Counter/Counter";
import Transcription from "../../components/Transcription/Transcription";

export function Details() {
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
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

  const handleQtyChange = qty => {
    setQty(qty);
  }

  const handleChangeNotes = e => {
    setNotes(e.target.value);
  }

  const onTranscribe = text => {
    setNotes(notes + "\n" + text);
  }

  return (
    item &&
    <div>
      <div tabIndex={1} aria-label={item.imageDescription} className="item-details__img" style={{ backgroundImage: `url("${item.imageUrl}")` }}>
      </div>
      <div className="item-details__container">
        <div className="item-details__container__upper">
          <div tabIndex={1} className="item-details__container__upper--name">{item.name}</div>
          <div className="item-details__container__upper--description">
            <div tabIndex={1} className="item-details__container__upper--description--header">Description</div>
            <div tabIndex={1} className="item-details__container__upper--description--text">{item.description}</div>
          </div>
          <div className="item-details__container__upper--order-details">
            <div className="item-details__container__upper--order-details--subtotal">
              <Counter onChange={handleQtyChange} />
              <div tabIndex={1} className="item-details__container__upper--order-details--subtotal--price">${(item.price * qty).toFixed(2)}</div>
            </div>
            <div className="item-details__container__upper--order-details--notes">
              <input
                tabIndex={1}
                type="text"
                placeholder="Any Notes to Restaurant?"
                className="order-notes"
                value={notes}
                onChange={handleChangeNotes}
              />
              <Transcription tabindex={1} ariaLabel="Dictate to take notes" onResult={onTranscribe} />
            </div>
          </div>
        </div>

      </div>
    </div>

  );
}