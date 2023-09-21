import { useEffect, useState } from 'react';
import './Counter.css';

export default function Counter({onChange, tabindex, initNum}){
    const [num,setNum] = useState(initNum || 1);
    useEffect(()=>{
        if(onChange) onChange(num);
    },[num]);

    const increase = () =>{
        setNum(num+1);
    }

    const decrease = () =>{
        setNum(Math.max(num-1,1));
    }

    return (
        <div className="counter">
            <div tabIndex={tabindex || 1} aria-label='decrease quantity' onClick={decrease} className="counter--minus"><h2>-</h2></div>
            <div tabIndex={tabindex || 1} aria-label='order quantity' className="counter--number">{num}</div>
            <div tabIndex={tabindex || 1} aria-label='increase quantity' onClick={increase} className="counter--plus"><h2>+</h2></div>
        </div>
    );
}