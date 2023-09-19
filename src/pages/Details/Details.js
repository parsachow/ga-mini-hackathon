import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMeal } from '../../utilities/meal-service'
import './Details.css'
import sendRequest from "../../utilities/send-request";
import { addItemToCart } from "../../utilities/orders-api";

export function Details(props) {

  const [meal, setMeal] = useState(null);
  const { id } = useParams();
  const min = 1;
  const max = 10;

  const [value, setValue] = useState(1);

  useEffect(() => {
    const handleRequest = async () => {
      try {
        const mealData = await getMeal(id)
        console.log(mealData)
        setMeal(mealData)
      } catch (err) {
        console.log(err)
      }
    }
    handleRequest();
  }, [id]);

  const handleChange = event => {
    const value = Math.max(min, Math.min(max, Number(event.target.value)));
    setValue(value);
  };

  const addFavorites = async e => {
    await sendRequest("/profile/favorites", "post", { menuItem: "menuItem._id" });

  }

  const addToCart = async item => {
    await addItemToCart(item);
  }

  return (meal &&
    <div className="mealDetail">
      <div className="dsection1">
        <div>
          <img tabIndex={1} className="mealDetailImage" src={meal.imageUrl} alt={meal.imageDescription} />
        </div>
        <div><i tabIndex={2} aria-label="add to favorites" className="fa fa-heart favLink" onClick={addFavorites}></i></div>
      </div>
      <div className="dsection2">
        <h1  tabIndex={1} className="mealName">{meal.name}</h1>
        <p  tabIndex={1} className="mealDescription">{meal.description}</p>
      </div>
      <div className="dsection3">
        <div>
          <label htmlFor="qty">quantity</label>
          <input  tabIndex={1}  id="qty" type="number" placeholder="1" value={value} onChange={handleChange} className="quantity" />
        </div>
        <div><button tabIndex={1}  className="cart-btn" onClick={()=>addToCart(meal._id)}>Add to Cart</button></div>
      </div>
    </div>
  );
}