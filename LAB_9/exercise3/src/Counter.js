import { useState } from 'react';
import './App.css';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset     = () => setCount(0);

  const color =
    count > 0 ? '#00b4a6' :
    count < 0 ? '#ef4444' : '#6b7280';

  return (
    <div className="page">
      <div className="counter-card">
        <p className="counter-label">COUNTER</p>
        <div className="counter-display" style={{ color }}>
          {count}
        </div>
        <p className="counter-hint">
          {count === 0 ? 'Press a button to start' :
           count > 0   ? `${count} above zero` :
                         `${Math.abs(count)} below zero`}
        </p>
        <div className="btn-row">
          <button className="btn btn-minus" onClick={decrement}>−</button>
          <button className="btn btn-reset" onClick={reset}>Reset</button>
          <button className="btn btn-plus"  onClick={increment}>+</button>
        </div>
      </div>
    </div>
  );
}

export default Counter;