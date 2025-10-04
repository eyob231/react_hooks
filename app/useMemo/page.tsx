'use client'
import { useMemo , useState} from "react";

export default function UseMemoExample() {
    const [count , setCount] = useState(0);
    const [name , setName] = useState('John');
    const memorizedCount = useMemo(() => count, [count]);
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <p>Memorized Count: {memorizedCount}</p>
            <p>Name: {name}</p>
            <button onClick={() => setName('Jane')}>Change Name</button>
        </div>
    )
}
