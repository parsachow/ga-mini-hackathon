import { useEffect, useState } from 'react';
import './Counter.css';

export default function Counter({onChange}){
    const [num,setNum] = useState(1);
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
            <div onClick={decrease} className="counter--minus"><h2>-</h2></div>
            <div className="counter--number">{num}</div>
            <div onClick={increase} className="counter--plus"><h2>+</h2></div>
        </div>
    );
}