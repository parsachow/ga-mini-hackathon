import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMeal } from '../../utilities/meal-service'

export function Details(props) {

  const [meal, setMeal] = useState(null);
  const { id } = useParams();

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

  return ( meal &&
    <div className="mealDetail">
      <img className="mealDetailImage" src={meal.imageUrl} alt={meal.imageDescription} />
      <i className="favIcon"></i>
      <h1>{meal.name}</h1>
      <p>{meal.description}</p>
      <button>-</button><input type="number" /><button>+</button>
      <button>Add to Cart</button>
    </div>
  );
}