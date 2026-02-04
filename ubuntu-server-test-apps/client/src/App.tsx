import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Item {
  id: string;
  content: string;
}

const fetchItems = async () => {
  const response = await fetch('/api/items');
  const items = await response.json();
  return items;
}

function App() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState<Item[]>([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      setItems(await fetchItems());
    })();
  }, []);

  const handleAddItem = async () => {
    await fetch('/api/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item: value }),
    });
    setItems(await fetchItems());
  };

  const handleDeleteItem = async (id: string) => {
    await fetch(`/api/items/${id}`, { method: 'DELETE' });
    setItems(await fetchItems());
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="input-container">
        <input value={value} onChange={e => setValue(e.target.value)} />
        <button onClick={handleAddItem}>Add</button>
      </div>
      <div className="items">
        <p>Hey look! Here are the fetched items!</p>
        <ul>
          {items.map(item => (
            <li className="item" key={item.id}>
              <p>{item.content}</p>
              <button style={{ backgroundColor: '#000055' }} onClick={() => handleDeleteItem(item.id)}>DELETE</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
