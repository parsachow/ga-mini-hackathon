import * as mealAPI from './meal-api'

export async function getMeal(id){
    try {
        const foundPerson = await mealAPI.detail(id)
        return foundPerson
    }catch(err){
        console.log(err)
        throw new Error(err)
    }
}