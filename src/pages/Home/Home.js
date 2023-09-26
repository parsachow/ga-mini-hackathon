import './Home.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuItem from "../../components/MenuItem/MenuItem";
import SearchBar from '../../components/SearchBar/SearchBar';
import FoodCategory from '../../components/FoodCategory/FoodCategory';
import { getUser } from '../../utilities/user-service';
import { addItemToCart } from '../../utilities/orders-api';
import Deals from '../../components/Deals/Deals';
import sendRequest from '../../utilities/send-request';
// import { isDisabled } from '@testing-library/user-event/dist/utils';

export function Home({setCart}){
    const [menu, setMenu] = useState([]);
    const [filteredMenu,setFilteredMenu] = useState([]);
    const [favItems, setFavItems] = useState([]);
    const navigate = useNavigate();
    const BASE_URL = "http://localhost:4000/menu";
    const [title, setTitle] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        async function fetchData() { 
          try {
            const response = await fetch(BASE_URL)
            if(response.ok){
                const meals = await response.json()
                setMenu(meals);
                setFilteredMenu(meals);
                setTitle("Menu")
            }
          }catch(err){
              console.log(err)
          }  
        }
        async function fetchProfile(){
            try {
                if(!getUser()) return;
                const res = await sendRequest(`/profile`);
                setFavItems(res.favItems);
            } catch (error) {
                console.error(error);
            }
        }    
        fetchData();
        fetchProfile();
      }, []);

      const appetizerSelector= () =>{
        setTitle("Appetizers")
        if (searchTerm && filteredMenu !== []) {
            setFilteredMenu(filteredMenu.filter(item => item.foodCategory.toLowerCase().includes("appetizer")));
        }else if(searchTerm && filteredMenu === []){
            console.log(`${searchTerm} and appetizer`)
            setFilteredMenu(menu.filter(item => {
                (item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)) && item.foodCategory.toLowerCase().includes("appetizer")
            }));
        }else{
            setFilteredMenu(menu.filter(item => item.foodCategory.toLowerCase().includes("appetizer")));
        }
              
      }
      const entreeSelector= () =>{
        setTitle("Entrees")
        if (searchTerm && filteredMenu !== []) {
            setFilteredMenu(filteredMenu.filter(item => item.foodCategory.toLowerCase().includes("entree")));
        }else if(searchTerm){
            setFilteredMenu(menu.filter(item => {
                (item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)) && item.foodCategory.toLowerCase().includes("entree")
            }));
        }else{
            setFilteredMenu(menu.filter(item => item.foodCategory.toLowerCase().includes("entree")));
        }
               
      }
      const dessertSelector=() =>{
        setTitle("Desserts")
        if (searchTerm && filteredMenu) {
            setFilteredMenu(filteredMenu.filter(item => item.foodCategory.toLowerCase().includes("dessert")));
        }else if(searchTerm){
            setFilteredMenu(menu.filter(item => {
                (item.name.toLowerCase().includes(searchTerm) || item.description.toLowerCase().includes(searchTerm)) && item.foodCategory.toLowerCase().includes("dessert")
            }));
        }else{
            setFilteredMenu(menu.filter(item => item.foodCategory.toLowerCase().includes("dessert")));
        }
                
      }
    
      const search = text => {
        if (text && filteredMenu !==[]) {
            const searchTerms = text.toLowerCase().trim().split(" ").filter(el => el);
            setFilteredMenu(filteredMenu.filter(item =>
                searchTerms.every(term =>
                    item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term) || item.foodCategory.toLowerCase().includes(term)
                )
            ));
            setSearchTerm(searchTerms)
        }else if(text && filteredMenu === []){
            const searchTerms = text.toLowerCase().trim().split(" ").filter(el => el);
            setFilteredMenu(menu.filter(item =>
                searchTerms.every(term =>
                    item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term) || item.foodCategory.toLowerCase().includes(term)
                )
            ));
            setSearchTerm(searchTerms)
        }else{
            setFilteredMenu(menu);
            setSearchTerm("")
        }
    }

    const handleAddToCart = async itemId =>{
        if(!getUser()) return navigate('/signin');
        const cart = await addItemToCart(itemId);
        setCart(cart);
    }

    const handleToggleFavorite = async (itemId) => {
        if (!getUser()) return navigate('/signin');
        let favorites;
        if (favItems && favItems.includes(itemId)) {
          favorites = await sendRequest(`/profile/favorites/${itemId}`,'DELETE');
        } else {
          favorites = await sendRequest(`/profile/favorites`, 'POST', { menuItem: itemId });
        }
        setFavItems(favorites);
      }

    return(  
        <div className='home'> 
            <img alt="delicious spaghetti with tomatoe sauce" className="topImage" src="https://i.imgur.com/MWgc0PL.jpg"></img> 
            <div className='filterbar'><SearchBar onChange={search} placeholder="enter a word to search our menu" /></div>
            <div className='categoryButtons' >
                <div onClick={appetizerSelector}><FoodCategory foodCategory={"Appetizer"} onClick={appetizerSelector}/></div>
                <div onClick={entreeSelector}><FoodCategory foodCategory={"Entree"} /></div>
                <div onClick={dessertSelector}><FoodCategory foodCategory={"Dessert"} /></div>
            </div>
            <h2 className="titleNameTag"><span className='titleName'>{title}</span></h2>
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
                    favIconToggled={!!(favItems && favItems.includes(item._id))}
                    onToggleFavItem={handleToggleFavorite}
                />
            )}
            <h2 className="titleNameTag"><span className='titleName'>Today's Special</span></h2>
            <div className="dealAtHome">
                <Deals/>
            </div>
        </div>         

    )
}

