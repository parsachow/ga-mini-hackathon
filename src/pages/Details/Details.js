import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMeal } from '../../utilities/meal-service'

export function Details(props){

  const [meal, setMeal] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    console.log(id)
    const handleRequest = async () => {
		try {            
            const mealData = await getMeal(id)
            console.log(mealData)
            setMeal(mealData)
		}catch(err){
				console.log(err)
		}
    }
    handleRequest()}, [])
    
    console.log(`Current Meal: ${JSON.stringify(meal)}`)

    return (
        <div className="mealDetail">
            <img className="mealDetailImage" src={meal.imageUrl} alt={meal.imageDescription}/>
            <i class="fa fa-heart" className="favIcon"></i>
            <h1>{meal.name}</h1>
            <p>{meal.description}</p>
            <button>-</button><input>1</input><button>+</button>
            <button>Add to Cart</button>
        </div>
    )
}