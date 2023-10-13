import './Home.css'
import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuItem from "../../components/MenuItem/MenuItem";
import SearchBar from '../../components/SearchBar/SearchBar';
import FoodCategory from '../../components/FoodCategory/FoodCategory';
import { getUser } from '../../utilities/user-service';
import { addItemToCart } from '../../utilities/orders-api';
import Deals from '../../components/Deals/Deals';
import sendRequest from '../../utilities/send-request';
import { ReactComponent as AppetizerLogo } from '../../svg files/Group.svg';
import { ReactComponent as EntreeLogo } from '../../svg files/food-kitchenware-serving-dome--cook-tool-dome-kitchen-serving-paltter-dish-tools-food.svg';
import { ReactComponent as DessertLogo } from '../../svg files/Vector.svg';
// import { isDisabled } from '@testing-library/user-event/dist/utils';

export function Home({ setCart }) {
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    const [favItems, setFavItems] = useState([]);
    const navigate = useNavigate();
    const BASE_URL = "http://localhost:4000/menu";
    const [title, setTitle] = useState("")
    const [activeCategory, setActiveCategory] = useState("");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(BASE_URL)
                if (response.ok) {
                    const meals = await response.json()
                    setMenu(meals);
                    setFilteredMenu(meals);
                    setTitle("Menu")
                }
            } catch (err) {
                console.log(err)
            }
        }
        async function fetchProfile() {
            try {
                if (!getUser()) return;
                const res = await sendRequest(`/profile`);
                setFavItems(res.favItems);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
        fetchProfile();
    }, []);

    const search = useCallback(text => {
        if (text) {
            const searchTerms = text.toLowerCase().trim().split(" ").filter(el => el);
            setFilteredMenu(menu.filter(item =>
                searchTerms.every(term =>
                    item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term))
                && (activeCategory ? item.foodCategory === activeCategory : true)));
        } else {
            setFilteredMenu(menu.filter(item => activeCategory ? item.foodCategory === activeCategory : true));
        }
    }, [activeCategory, menu]);

    useEffect(() => {
        search(searchText);
    }, [searchText, search]);

    const onClickFoodCategory = (category) => {
        if (activeCategory === category) {
            setActiveCategory("");
            setTitle("Menu");
            search(searchText);
        } else {
            setActiveCategory(category);
            setTitle(category[0].toUpperCase() + category.substring(1) + "s");
            search(searchText);
        }
    }

    const onKeyPressFoodCategory = (e,category) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onClickFoodCategory(category);
        }
    }



    const handleAddToCart = async itemId => {
        if (!getUser()) return navigate('/signin');
        const cart = await addItemToCart(itemId);
        setCart(cart);
    }

    const handleToggleFavorite = async (itemId) => {
        if (!getUser()) return navigate('/signin');
        let favorites;
        if (favItems && favItems.includes(itemId)) {
            favorites = await sendRequest(`/profile/favorites/${itemId}`, 'DELETE');
        } else {
            favorites = await sendRequest(`/profile/favorites`, 'POST', { menuItem: itemId });
        }
        setFavItems(favorites);
    }

    return (
        <div className='home'>
            <div alt="delicious spaghetti with tomatoe sauce" className="topImage" src="https://i.imgur.com/MWgc0PL.jpg"></div>
            <div className='filterbar'><SearchBar onChange={setSearchText} placeholder="enter a word to search our menu" /></div>
            <div className='categoryButtons' >
                <FoodCategory
                    toggled={activeCategory === "appetizer"}
                    categoryName="Appetizers"
                    onKeyPress={(e)=>onKeyPressFoodCategory(e,"appetizer")}
                    onClick={() => onClickFoodCategory("appetizer")}>
                    <AppetizerLogo />
                </FoodCategory>
                <FoodCategory
                    toggled={activeCategory === "entree"}
                    categoryName="Entrees"
                    onKeyPress={(e)=>onKeyPressFoodCategory(e,"entree")}
                    onClick={() => onClickFoodCategory("entree")}>
                    <EntreeLogo />
                </FoodCategory>
                <FoodCategory
                    toggled={activeCategory === "dessert"}
                    categoryName="Desserts"
                    onKeyPress={(e)=>onKeyPressFoodCategory(e,"dessert")}
                    onClick={() => onClickFoodCategory("dessert")}>
                    <DessertLogo />
                </FoodCategory>
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
                <Deals handleAddToCart={handleAddToCart} />
            </div>
        </div>

    )
}

