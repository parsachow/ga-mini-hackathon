import 'semantic-ui-css/semantic.min.css'
import './Home.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import MenuItem from "../../components/MenuItem/MenuItem";


export function Home(){
    const [menu, setMenu] = useState([]);
    const BASE_URL = "http://localhost:4000/menu";

    useEffect(() => {
        async function fetchData() { 
          try {
            const response = await fetch(BASE_URL)
            if(response.ok){
                // const deals = (await response.json()).filter((i) => (i.discount)? i : null)
                const meals = await response.json()
                setMenu(meals)
            }
          }catch(err){
              console.log(err)
          }  
        }    
        fetchData();
      }, []);
    

    return(  
        <div className='home'> 
            <img className="topImage" src="https://i.imgur.com/i3LZenx.jpg"></img>   
            {menu.map(item =>
                <MenuItem 
                    itemName={item.name} 
                    itemDescription={item.description} 
                    itemPrice={item.price} 
                    itemImgUrl={item.imageUrl}
                    itemImgAlt={item.imageDescription}
                    showFavIcon={true}
                    btnText="Add"
                />
            )}
        </div>  
        // <div className='home'>
        //     <Link to="/menu"><button className="menuButton" type="button">Search our menu</button></Link>
        //     <div className='deals'>
        //         <h1>Ongoing Deals</h1>
        //         <div className="eachMenu">
        //             {dealMenu && dealMenu.map((meal)=>(
        //                 <Link to={`/menu/${meal._id}`}>
        //                     <div className="menuItem">
        //                         <img className="mealImage" src={meal.imageUrl} alt={meal.imageDescription}/>
        //                         <h2 className="mealName" key={meal._id}>{meal.name}</h2>
        //                         <p className="price">
        //                             <span className='initialPrice'>${meal.price.toFixed(2)}</span>&nbsp;&nbsp;
        //                             <span>${(meal.price - (meal.price*meal.discount)).toFixed(2)}</span>
        //                         </p>
        //                     </div>
        //                 </Link>
        //             ))}
        //         </div>                
        //     </div>
        // </div>        

    )
}

