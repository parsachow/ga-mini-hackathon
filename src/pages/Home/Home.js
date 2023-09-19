import './Home.css'
import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import MenuItem from "../../components/MenuItem/MenuItem";
import SearchBar from '../../components/SearchBar/SearchBar';
import FoodCategory from '../../components/FoodCategory/FoodCategory';
import Deals from '../../components/Deals/Deals';

export function Home(){
    const [menu, setMenu] = useState([]);
    const [filteredMenu,setFilteredMenu] = useState([]);
    const BASE_URL = "http://localhost:4000/menu";

    useEffect(() => {
        async function fetchData() { 
          try {
            const response = await fetch(BASE_URL)
            if(response.ok){
                // const deals = (await response.json()).filter((i) => (i.discount)? i : null)
                const meals = await response.json()
                setMenu(meals);
                setFilteredMenu(meals);
            }
          }catch(err){
              console.log(err)
          }  
        }    
        fetchData();
      }, []);
    
      const search = text => {
        if (text) {
            const searchTerms = text.toLowerCase().trim().split(" ").filter(el => el);
            setFilteredMenu(menu.filter(item =>
                searchTerms.every(term =>
                    item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
                )
            ));
        }else{
            setFilteredMenu(menu);
        }
    }

    return(  
        <div className='home'> 
            <img alt="delicious spaghetti with tomatoe sauce" className="topImage" src="https://i.imgur.com/i3LZenx.jpg"></img> 
            <div className='filterbar'><SearchBar onChange={search} placeholder="search our menu" /></div>
            <div className='categoryButtons'>
                <FoodCategory foodCategory={"Appetizer"}/>
                <FoodCategory foodCategory={"Entree"}/>
                <FoodCategory foodCategory={"Dessert"}/>
            </div>
            <h2 className="titleNameTag"><span className='titleName'>Order Again</span></h2>
            {filteredMenu.map(item =>
                <MenuItem 
                    itemName={item.name} 
                    itemDescription={item.description} 
                    itemPrice={item.price} 
                    itemImgUrl={item.imageUrl}
                    itemImgAlt={item.imageDescription}
                    showFavIcon={true}
                    btnText="Add"
                    key={item._id}
                    itemId={item._id}
                />
            )}
            <h2 className="titleNameTag"><span className='titleName'>Today's Special</span></h2>
            <div className="dealAtHome">
                <Deals/>
            </div>
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

