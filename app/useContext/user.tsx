
'use client'
import { useContext,useState } from "react";
import { Context } from "./context";



export const User=()=>{
    const {user , setUser}= useContext(Context);
    const [name , setName]= useState('');
    return (
        <div>
            <h1>User</h1>
            <p>{user}</p>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button onClick={()=>setUser(name)}>Set User</button>

        </div>
    )
}
