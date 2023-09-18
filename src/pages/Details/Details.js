import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMeal } from '../../utilities/meal-service'
import './Details.css'
import sendRequest from "../../utilities/send-request";

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

  const addFavorites = async e =>{
    await sendRequest("/profile/favorites", "post", {menuItem:"menuItem._id"});

  }

  return ( meal &&
    <div className="mealDetail">
      <div className="dsection1">
        <div>
          <img className="mealDetailImage" src={meal.imageUrl} alt={meal.imageDescription} />
        </div>
        <div><i className="fa fa-heart favLink" onClick={addFavorites}></i></div>
      </div>
      <div className="dsection2">
          <h1 className="mealName">{meal.name}</h1>
          <p className="mealDescription">{meal.description}</p>
      </div>
      <div className="dsection3">
        <div>
          <input type="number" placeholder="1" value={value} onChange={handleChange} className="quantity" />
        </div>
        <div><button>Add to Cart</button></div>       
      </div>
    </div>
  );
}