import { useState } from 'react';
import './index.css';

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newItem = {
      id: crypto.randomUUID(),
      text: inputValue.trim()
    };
    
    setItems([...items, newItem]);
    setInputValue('');
  };

  const handleRemoveItem = (idToRemove) => {
    setItems(items.filter(item => item.id !== idToRemove));
  };

  return (
    <div className="container">
      <h1>Daily Goals</h1>
      <form onSubmit={handleAddItem} className="input-group">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="What do you want to accomplish?"
        />
        <button type="submit" onClick={handleAddItem}>Add</button>
      </form>
      
      {items.length === 0 ? (
        <p className="empty-message">Your list is empty. Add a goal to get started!</p>
      ) : (
        <ul className="item-list">
          {items.map(item => (
            <li key={item.id} className="item">
              <span>{item.text}</span>
              <button 
                className="remove-btn" 
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
