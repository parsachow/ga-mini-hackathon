import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMeal } from '../../utilities/meal-service'

export function Details(props){

  const [meal, setMeal] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const handleRequest = async () => {
      try {            
        const mealData = await getMeal(id)
        console.log(mealData)
        setMeal(mealData)
      }catch(err){
        console.log(err)
      }
    }
    handleRequest()}, [id])
    
    // console.log(`Current Meal: ${JSON.stringify(meal)}`)

    return (
        <div className="mealDetail">
          <h1>{meal.name}</h1>
            
            {/* <button key={meal._id}>-</button><input key={meal._id}>1</input><button key={meal._id}>+</button>
            <button key={meal._id}>Add to Cart</button> */}
        </div>
    )
}