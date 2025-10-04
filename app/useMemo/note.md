# React useMemo - Simple Breakdown

## What is useMemo?

Think of `useMemo` as a **"memory box"** for your calculations. It remembers the result so it doesn't have to calculate again unless something changes.

```jsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

## Simple Real-Life Example

**Without useMemo:**
```jsx
function Kitchen() {
  const [ingredients, setIngredients] = useState(['flour', 'sugar']);
  const [theme, setTheme] = useState('light');
  
  // This runs every time, even when just changing theme
  const cake = bakeCake(ingredients); // Slow process!
  
  return (
    <div className={theme}>
      <button onClick={() => setTheme('dark')}>Change Theme</button>
      <p>Your cake: {cake}</p>
    </div>
  );
}
```

**With useMemo:**
```jsx
function Kitchen() {
  const [ingredients, setIngredients] = useState(['flour', 'sugar']);
  const [theme, setTheme] = useState('light');
  
  // Only bakes cake when ingredients change
  const cake = useMemo(() => {
    return bakeCake(ingredients); // Slow process!
  }, [ingredients]); // Only re-bake if ingredients change
  
  return (
    <div className={theme}>
      <button onClick={() => setTheme('dark')}>Change Theme</button>
      <p>Your cake: {cake}</p>
    </div>
  );
}
```

## When to Use useMemo - The 3 Main Cases

### 1. **Slow Calculations** ⏳
When you have functions that take a long time to run.

```jsx
function Calculator() {
  const [number, setNumber] = useState(0);
  
  // SLOW calculation - only runs when number changes
  const slowResult = useMemo(() => {
    console.log('Calculating slowly...');
    let result = 0;
    for (let i = 0; i < 1000000000; i++) {
      result += number;
    }
    return result;
  }, [number]);
  
  return <div>Result: {slowResult}</div>;
}
```

### 2. **Same Object Reference** 🔄
When you want to keep the exact same object (not create a new one each time).

```jsx
function UserProfile() {
  const [user, setUser] = useState('John');
  const [theme, setTheme] = useState('light');
  
  // ❌ BAD - creates new object every render
  // const settings = {
  //   theme: theme,
  //   user: user
  // };
  
  // ✅ GOOD - same object unless theme/user changes
  const settings = useMemo(() => {
    return {
      theme: theme,
      user: user
    };
  }, [theme, user]);
  
  return <Profile settings={settings} />;
}
```

### 3. **Avoiding Unnecessary Child Renders** 👶
When passing objects/arrays to optimized child components.

```jsx
// Child component that only re-renders when props actually change
const ExpensiveComponent = React.memo(({ data }) => {
  console.log('Child rendering...');
  return <div>{data.value}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  
  // ✅ Child won't re-render when count changes
  const data = useMemo(() => ({ value: 'static' }), []);
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ExpensiveComponent data={data} />
    </div>
  );
}
```

## How to Write useMemo - Step by Step

### Step 1: Identify the expensive part
```jsx
// This calculation is slow
const filteredUsers = users.filter(user => 
  user.name.includes(searchTerm)
);
```

### Step 2: Wrap it in useMemo
```jsx
const filteredUsers = useMemo(() => {
  return users.filter(user => 
    user.name.includes(searchTerm)
  );
}, [users, searchTerm]); // Step 3: Add dependencies
```

### Step 3: List all dependencies
Anything used inside useMemo that can change should be in the array:
```jsx
// ✅ Correct
useMemo(() => a + b + c, [a, b, c]);

// ❌ Wrong - missing 'c'
useMemo(() => a + b + c, [a, b]);
```

## Common Mistakes to Avoid

### ❌ Don't use for simple values:
```jsx
// ❌ Unnecessary
const double = useMemo(() => number * 2, [number]);

// ✅ Better
const double = number * 2;
```

### ❌ Don't forget dependencies:
```jsx
// ❌ Missing dependency
const result = useMemo(() => a + b, [a]); // 'b' is missing!

// ✅ Correct
const result = useMemo(() => a + b, [a, b]);
```

### ❌ Don't overuse:
```jsx
// ❌ Over-optimizing
const mappedArray = useMemo(() => 
  items.map(item => item.name), [items]
);

// ✅ Better for simple operations
const mappedArray = items.map(item => item.name);
```

## Quick Decision Guide

**Use useMemo when:**
- ✅ Doing heavy calculations (loops, complex math)
- ✅ Creating objects/arrays that are passed to memoized components  
- ✅ Need to keep the same object reference

**Don't use useMemo when:**
- ❌ Simple calculations (addition, string concatenation)
- ❌ Creating primitive values (strings, numbers, booleans)
- ❌ The calculation is already fast

## Real Example: Search Filter

```jsx
function UserSearch() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('light');
  
  // Filter users - can be slow with many users
  const filteredUsers = useMemo(() => {
    console.log('Filtering users...');
    return users.filter(user =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]); // Only re-filter when users or search changes
  
  return (
    <div className={theme}>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
      />
      <button onClick={() => setTheme('dark')}>
        Change Theme
      </button>
      
      {/* This list only re-renders when filteredUsers actually changes */}
      <UserList users={filteredUsers} />
    </div>
  );
}

const UserList = React.memo(({ users }) => {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
});
```

## Summary

| Situation | Use useMemo? | Example |
|-----------|-------------|---------|
| Slow calculation | ✅ Yes | `useMemo(() => heavyCalc(data), [data])` |
| Simple calculation | ❌ No | `const double = number * 2` |
| Object for child component | ✅ Yes | `useMemo(() => ({theme, user}), [theme, user])` |
| Primitive value | ❌ No | `const name = "John"` |

**Remember:** useMemo is like a cache - it saves the result and only recalculates when dependencies change!