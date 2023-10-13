import './Deals.css'
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'

export default function Deals({handleAddToCart}){
    const [dealMenu, setDealMenu] = useState([]);
    const navigate = useNavigate();
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

    const handleAddToCartD = async () =>{
        for(let i=0; i< dealMenu.length; i++){
            await handleAddToCart(dealMenu[i]._id);
        }
    }

    return(
        <div className='dealsComponent'>
            <div className='dealsDisplay'>
                {dealMenu && dealMenu.map((i,idx)=> <img key={idx} className='dealsImage' src={i.imageUrl} alt={i.imageDescription}/>)}
                <h2 className='dealNames'>{dealNames[0]} and {dealNames[1]}</h2>
            </div>
            <div className='dealAddCartDiv'>
                <Link onClick={handleAddToCartD} to="#!" className="dealAddCart">Add both for ${sum}</Link>
            </div>
        </div>
    )

}