import './Home.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuItem from "../../components/MenuItem/MenuItem";
import SearchBar from '../../components/SearchBar/SearchBar';
import FoodCategory from '../../components/FoodCategory/FoodCategory';
import { getUser } from '../../utilities/user-service';
import { addItemToCart } from '../../utilities/orders-api';
import Deals from '../../components/Deals/Deals';

export function Home({setCart}){
    const [menu, setMenu] = useState([]);
    const [filteredMenu,setFilteredMenu] = useState([]);
    const navigate = useNavigate();
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

    const handleAddToCart = async itemId =>{
        if(!getUser()) return navigate('/signin');
        const cart = await addItemToCart(itemId);
        setCart(cart);
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
                    onClick={handleAddToCart}
                />
            )}
            <h2 className="titleNameTag"><span className='titleName'>Today's Special</span></h2>
            <div className="dealAtHome">
                <Deals/>
            </div>
        </div>         

    )
}

