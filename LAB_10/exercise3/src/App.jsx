import { useState, useEffect } from 'react';
import './index.css';

function UserCard({ user }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{user.name}</h2>
        <span className="badge">@{user.username}</span>
      </div>
      <div className="card-body">
        <p>
          <span className="icon">✉️</span> 
          {user.email}
        </p>
        <p>
          <span className="icon">📞</span> 
          {user.phone.split(' ')[0]}
        </p>
        <p>
          <span className="icon">🏢</span> 
          {user.company.name}
        </p>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ensuring the API call runs only once by keeping dependency array empty empty []
    const fetchData = async () => {
      try {
        setLoading(true);
        // Using JSONPlaceholder API to fetch user info asynchronously
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (e) {
        setError(e.message || 'An unexpected error occurred while fetching data.');
      } finally {
        setLoading(false); // Disable loading indicator gracefully
      }
    };

    fetchData();
  }, []); 

  return (
    <div className="app-container">
      <header className="header">
        <h1>Cloud Directory</h1>
        <p>Live user base synchronizing dynamically from remote API.</p>
      </header>

      <main className="content">
        {/* Loading Indicator */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Establishing connection...</p>
          </div>
        )}

        {/* Error Handling */}
        {error && (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <h2>Connection Failed</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="retry-btn">
              Attempt Reconnection
            </button>
          </div>
        )}

        {/* Data Display */}
        {!loading && !error && data.length > 0 && (
          <div className="grid">
            {data.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
        
        {/* Empty State Fallback */}
        {!loading && !error && data.length === 0 && (
          <div className="empty-state">
            <p>Database is empty.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
