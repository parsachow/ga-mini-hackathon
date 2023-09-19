import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import './Details.css';
import { addItemToCart } from "../../utilities/orders-api";
import Counter from "../../components/Counter/Counter";
import Transcription from "../../components/Transcription/Transcription";
import { getUser } from "../../utilities/user-service";
import sendRequest from "../../utilities/send-request";

export function Details({ setCart }) {
  const [item, setItem] = useState(null);
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [favItems, setFavItems] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await sendRequest(`/profile`);
        setFavItems(res.favItems);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProfile();
  }, []);

  const handleQtyChange = qty => {
    setQty(qty);
  }

  const handleChangeNotes = e => {
    setNotes(e.target.value);
  }

  const onTranscribe = text => {
    setNotes(notes + "\n" + text);
  }

  const handleAddToCart = async () => {
    if (!getUser()) return navigate('/signin');
    const cart = await addItemToCart(item._id, qty);
    setCart(cart);
    return navigate('/');
  }

  const handleToggleFavorite = async () => {
    if (!getUser()) return navigate('/signin');
    let favorites;
    if (favItems && favItems.includes(item._id)) {
      favorites = await sendRequest(`/profile/favorites/${item._id}`,'DELETE');
    } else {
      favorites = await sendRequest(`/profile/favorites`, 'POST', { menuItem: item._id });
    }
    setFavItems(favorites);
  }

  return (
    item &&
    <div>
      <div tabIndex={1} aria-label={item.imageDescription} className="topImage" style={{ backgroundImage: `url("${item.imageUrl}")` }}>
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
          {getUser() && <div onClick={handleToggleFavorite} tabIndex={1} className={`item-details__fav-icon ${favItems && favItems.includes(item._id) ? "toggled" : ""}`}></div>}
        </div>
      </div>
      {!!item.extras.length && item.extras.map((item, idx) => {
        return (
          <div key={`customize_${idx}`}>
            <h2 className="titleNameTag"><span className='titleName' tabIndex={1}>Customize Order</span></h2>
            <div className="customize-order">
              <div className="customization">
                <div className="checkbox-area"><input tabIndex={1} type="checkbox" id={`custom_option_${idx}`} /></div>
                <div className="label-area"><label tabIndex={1} htmlFor={`custom_option_${idx}`}>{item}</label></div>
              </div>
            </div>
          </div>);
      })}
      <div className='add-cart-btn'>
        <button tabIndex={1} onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>

  );
}