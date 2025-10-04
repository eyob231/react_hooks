'use client'
import { useRef,useState } from "react";

export const Useref=()=>{
    const [count,setcount]=useState(0)
    const countref=useRef(0)
    const handleClick=()=>{
        setcount(count+1)
        countref.current++
        console.log('state',count);
        console.log('ref',countref.current);
    }
return(
    <div>
        <h1>{count}</h1>
        <h1>{countref.current}</h1>
        <button onClick={()=>{handleClick()}}>click</button>
    </div>
)
}