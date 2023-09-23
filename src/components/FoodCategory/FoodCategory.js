import './FoodCategory.css';
import { useEffect, useState } from 'react';
import React from 'react';
import {ReactComponent as AppetizerLogo} from '../../svg files/Group.svg';
import {ReactComponent as EntreeLogo} from '../../svg files/food-kitchenware-serving-dome--cook-tool-dome-kitchen-serving-paltter-dish-tools-food.svg';
import {ReactComponent as DessertLogo} from '../../svg files/Vector.svg';



export default function FoodCategory({ foodCategory, onClick, tabindex }) {
    const [category, setCategory] = useState("")
    useEffect(()=>{
        if(foodCategory) { setCategory(foodCategory)}
    },[]);

    return (
        <div className="foodCategory" tabIndex={tabindex || 1}>
            <div className='categoryIcon'>
                {
                    category && category.toLowerCase()==="appetizer"?<AppetizerLogo className='appetizer'/>:
                    category.toLowerCase() === "entree"?<EntreeLogo className='entree'/>:
                    category.toLowerCase() === "dessert"?<DessertLogo/>: null
                }
            </div>
            <div className='categoryName'>
                {
                    category && category.toLowerCase()==="appetizer"?"Appetizer":
                    category.toLowerCase() === "entree"?"Entree":
                    category.toLowerCase() === "dessert"?"Dessert": null
                }
            </div>
        </div>
    );
}