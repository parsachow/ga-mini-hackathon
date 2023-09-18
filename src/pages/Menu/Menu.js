import { useState, useEffect } from "react";
import './Menu.css'
import { Link } from 'react-router-dom';

export function Menu(props){
    const [appetizers, setAppetizers] = useState([]);
    const [entrees, setEntrees] = useState([]);
    const [desserts, setDesserts] = useState([]);
    const BASE_URL = "http://localhost:4000/menu";

    useEffect(() =>{
        const getMenuData = async () => {
            try {
              const response = await fetch(BASE_URL)
              
              if(response.ok){
                const res = (await response.json())
                const allAppetizers = res.filter((i) => i.foodCategory==='appetizer'? i: null)
                const allEntrees = res.filter((i) => i.foodCategory==='entree'? i: null)
                const allDesserts = res.filter((i) => i.foodCategory==='dessert'? i: null)
                console.log(allAppetizers)
                console.log(allEntrees)
                console.log(allDesserts)
                setAppetizers([...allAppetizers])
                setEntrees([...allEntrees])
                setDesserts([...allDesserts])
              }
            }catch(err){
                console.log(err)
            }  
        };
        getMenuData()}, []);

    return(
        <div className="home">
            <h1>Menu</h1>
            <div className='search-container'>
                <div>
                    <input type="text" className='searchbar' name="searchbar" placeholder="Search our menu..."/>
                </div>
                <div>
                    <button className="microphone" onClick={""}><i class="fa fa-microphone"></i></button>
                </div>                    
            </div>        
            <div className="eachMenu">
                <h2>Appetizers</h2>
                {appetizers && appetizers.map((meal)=>(
                    <Link to={`/menu/${meal._id}`}>
                        <div className="menuItem">
                            <img className="mealImage" src={meal.imageUrl} alt={meal.imageDescription}/>
                            <h3 className="mealName" key={meal._id}>{meal.name}</h3>
                            <p className="price">
                                {meal.discount?(
                                    <>
                                        <span className="initialPrice">${meal.price.toFixed(2)}</span>&nbsp;&nbsp;
                                        <span>${(meal.price - (meal.price*meal.discount)).toFixed(2)}</span>
                                    </>):(<span>${meal.price.toFixed(2)}</span>)
                                }
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="eachMenu">
                <h2>Entrees</h2>
                {entrees && entrees.map((meal)=>(
                    <Link to={`/menu/${meal._id}`}>
                        <div className="menuItem">
                            <img className="mealImage" src={meal.imageUrl} alt={meal.imageDescription}/>
                            <h3 className="mealName" key={meal._id}>{meal.name}</h3>
                            <p className="price">
                                {meal.discount?(
                                    <>
                                        <span className="initialPrice">${meal.price.toFixed(2)}</span>&nbsp;&nbsp;
                                        <span>${(meal.price - (meal.price*meal.discount)).toFixed(2)}</span>
                                    </>):(<span>${meal.price.toFixed(2)}</span>)
                                }
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="eachMenu">
                <h2>Desserts</h2>
                {desserts && desserts.map((meal)=>(
                    <Link to={`/menu/${meal._id}`}>
                        <div className="menuItem">
                            <img className="mealImage" src={meal.imageUrl} alt={meal.imageDescription}/>
                            <h3 className="mealName" key={meal._id}>{meal.name}</h3>
                            <p className="price">
                                {meal.discount?(
                                    <>
                                        <span className="initialPrice">${meal.price.toFixed(2)}</span>&nbsp;&nbsp;
                                        <span>${(meal.price - (meal.price*meal.discount)).toFixed(2)}</span>
                                    </>):(<span>${meal.price.toFixed(2)}</span>)
                                }
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
