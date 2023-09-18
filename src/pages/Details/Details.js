import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getMeal } from '../../utilities/meal-service'

export function Details(props){

  const [meal, setMeal] = useState(null)
  const { id } = useParams()

 const handleRequest = async () => {
		try {
            const mealData = await getMeal(id)
            setMeal(mealData)
		}catch(err){
				console.log(err)
		}
}

  console.log(`Current Meal: ${JSON.stringify(meal)}`)

  useEffect(() => {handleRequest()}, [])

  return <h1>Show component</h1>
}