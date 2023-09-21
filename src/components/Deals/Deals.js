import './Deals.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

export default function Deals(props){
    const [dealMenu, setDealMenu] = useState([]);
    let dealNames = []
    let sum = 0
    const BASE_URL = "http://localhost:4000/menu";

    useEffect(() => {
        async function fetchData() { 
          try {
            const response = await fetch(BASE_URL)
            if(response.ok){
                const res = await response.json()
                const deals = res.filter((i) => (i.discount)? i : null)
                setDealMenu(deals);
            }
            
          }catch(err){
              console.log(err)
          }  
        }    
        fetchData();
      }, []);

        dealMenu.forEach(el => {
            dealNames.push(el.name)
            sum += el.price - (el.price * el.discount)
        })

    return(
        <div className='dealsComponent'>
            <div className='dealsDisplay'>
                {dealMenu && dealMenu.map(i=> <img className='dealsImage' src={i.imageUrl}/>)}
                <h2 className='dealNames'>{dealNames[0]} and {dealNames[1]}</h2>
            </div>
            <div className='dealAddCartDiv'>
                <Link to="/cart" className="dealAddCart">Add both for ${sum}</Link>
            </div>
        </div>
    )

}