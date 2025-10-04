'use client'
import { createContext , useState} from "react";
export type ContextType = {
    user: string | null;
    setUser: (user: string) => void;
}

export const Context = createContext({user: "John", setUser: (user: string) => {}});

export const ContextProvider = ({children}: {children: React.ReactNode}) => {
    const [user, setUser] = useState('john');
    return (
        <Context.Provider value={{user, setUser}}>
            {children}
        </Context.Provider>
    )
}