import './FoodCategory.css';
import React from 'react';
import {ReactComponent as AppetizerLogo} from '../../svg files/Group.svg';
import {ReactComponent as EntreeLogo} from '../../svg files/food-kitchenware-serving-dome--cook-tool-dome-kitchen-serving-paltter-dish-tools-food.svg';
import {ReactComponent as DessertLogo} from '../../svg files/Vector.svg';



export default function FoodCategory({ foodCategory }) {
    return (
        <div className="foodCategory">
            <div className='categoryIcon'>
                {
                    foodCategory && foodCategory.toLowerCase()==="appetizer"?<AppetizerLogo />:
                    foodCategory.toLowerCase() === "entree"?<EntreeLogo className='entree'/>:
                    foodCategory.toLowerCase() === "dessert"?<DessertLogo/>: null
                }
            </div>
            <div className='categoryName'>
                {
                    foodCategory && foodCategory.toLowerCase()==="appetizer"?"Appetizer":
                    foodCategory.toLowerCase() === "entree"?"Entree":
                    foodCategory.toLowerCase() === "dessert"?"Dessert": null
                }
            </div>
        </div>
    );
}