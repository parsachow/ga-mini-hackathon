import './FoodCategory.css';
import { useEffect, useState } from 'react';
import React from 'react';




export default function FoodCategory({ categoryName, children, tabindex, toggled, onClick, onKeyPress }) {

    return (
        <div onKeyDown={onKeyPress} onClick={onClick} className={`foodCategory ${toggled ? "toggled" : ""}`} tabIndex={tabindex || 1}>
            <div className='categoryIcon'>
                {children}
            </div>
            <div className='categoryName'>
                {categoryName}
            </div>
        </div>
    );
}