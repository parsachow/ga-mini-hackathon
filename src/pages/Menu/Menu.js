import { useState, useEffect } from "react";
import './Menu.css'
import { Link } from 'react-router-dom';

export function Menu(props){
    const [appetizers, setAppetizers] = useState([]);
    const [entrees, setEntrees] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const BASE_URL = "http://localhost:4000/Menu";

    const getMenuData = async () => {
        try {
          const response = await fetch(BASE_URL)
          const allAppetizers = await response.filter((i) => {if(i.foodCategory=='appetizer') return i}).json()
          const allEntrees = await response.filter((i) => {if(i.foodCategory=='entree') return i}).json()
          const allDesserts = await response.filter((i) => {if(i.foodCategory=='dessert') return i}).json()
          if(response.ok){
            setAppetizers(allAppetizers)
            setEntrees(allEntrees)
            setDesserts(allDesserts)
          }
        }catch(err){
            console.log(err)
        }  
    };

    useEffect(() =>{getMenuData()}, []);

    return(
        <div>        
            <div className="eachMenu">
                <h1>Appetizers</h1>
                {appetizers && appetizers.map((meal)=>(
                    <Link to={`/menu/${meal._id}`}>
                        <div className="menuItem">
                            <h1 key={meal._id}>{meal.name}</h1>
                            <img className="mealImage" src={meal.image} alt=""/>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="eachMenu">
                <h1>Entrees</h1>
                {entrees && entrees.map((meal)=>(
                    <Link to={`/menu/${meal._id}`}>
                        <div className="menuItem">
                            <h1 key={meal._id}>{meal.name}</h1>
                            <img className="mealImage" src={meal.image} alt=""/>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="eachMenu">
                <h1>Desserts</h1>
                {desserts && desserts.map((meal)=>(
                    <Link to={`/menu/${meal._id}`}>
                        <div className="menuItem">
                            <h1 key={meal._id}>{meal.name}</h1>
                            <img className="mealImage" src={meal.image} alt=""/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
