import 'semantic-ui-css/semantic.min.css'
import './Home.css'
import React, { useState, useEffect } from 'react'

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
                    <div className="menuItem">
                        <h1 key={meal._id}>{meal.name}</h1>
                        <img className="mealImage" src={meal.image} alt=""/>
                    </div>
                    ))}
                </div>                
            </div>
        </div>        
    )
}

/**
 * const [showGood, setShowGood] = useState(false);
const [menus, setMenus] = useState([]);

  // Simulate fetch data from API
  useEffect(() => {
    async function fetchData() {
      // After fetching data with axios or fetch api
      // We process the data
      const goodMenus = dataFromAPI.filter((i) => i.taste === "Good");
      const restOfMenus = dataFromAPI.filter((i) => i.taste !== "Good");

      // Combine two arrays into one using spread operator
      // Put the good ones to the front of the array
      setMenus([...goodMenus, ...restOfMenus]); 
    }

    fetchData();
  }, []);

return (
  <div>
    // Create a checkbox (you can change it to a toggle button)
    <input type="checkbox" onChange={() => setShowGood(!showGood)} /> 

    // Conditionally pass in menu data based on the value of toggle button "showGood"
    <Table
      data={showGood ? menus : menus.filter((i) => i.taste !== "Good")}
    />
  </div>
);

 */