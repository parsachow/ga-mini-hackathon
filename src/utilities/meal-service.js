import * as mealAPI from './meal-api'

export async function getMeal(id){
    try {
        const foundMeal = await mealAPI.detail(id)
        return foundMeal
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}