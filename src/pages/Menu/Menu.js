import { useState, useEffect } from "react";

export function Menu(props){
    const [menu, setMenu] = useState(null);
    const BASE_URL = "http://localhost:4000/Menu";

    const getMenuData = async () => {
        try {
          const response = await fetch(BASE_URL)
          const allMeals = await response.json()
          if(response.ok){
            setMenu(allMeals)
          }
        }catch(err){
            console.log(err)
        }  
    };

    useEffect(() =>{getMenuData()}, []);

    return(
        <div className="eachMenu">
            {menu && menu.map((meal)=>(
            <div className="menuItem">
                <h1 key={meal._id}>{meal.name}</h1>
                <img className="mealImage" src={meal.image} alt=""/>
            </div>
            ))}
        </div>
    )
}
// export default Menu;