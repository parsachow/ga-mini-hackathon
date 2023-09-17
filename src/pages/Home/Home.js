import 'semantic-ui-css/semantic.min.css'
import './Home.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export function Home(){
    const [dealMenu, setDealMenu] = useState([]);
    const BASE_URL = "http://localhost:4000/Menu";

    useEffect(() => {
        async function fetchData() { 
          try {
            const response = await fetch(BASE_URL)
            const deals = await response.filter((i) => {if(i.discount) return i}).json()
            if(response.ok){
                setDealMenu([...deals])
            }
          }catch(err){
              console.log(err)
          }  
        }    
        fetchData();
      }, []);
    
    return(        
        <div className='home'>
            <div className='search-container'>
                <div>
                    <input type="text" className='searchbar' name="searchbar" placeholder="Search for our menu..."/>
                </div>
                <div>
                    <button className="microphone" onClick={""}><i class="fa fa-microphone"></i></button>
                </div>                    
            </div>
            <div className='deals'>
                <h1>Ongoing Deals</h1>
                <div className="eachMenu">
                    {dealMenu && dealMenu.map((meal)=>(
                        <Link to={`/menu/${meal._id}`}>
                            <div className="menuItem">
                                <img className="mealImage" src={meal.image} alt={meal.imageDescription}/>
                                <h1 key={meal._id}>{meal.name}</h1>
                                <p className="price">$ {meal.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>                
            </div>
        </div>        
    )
}

