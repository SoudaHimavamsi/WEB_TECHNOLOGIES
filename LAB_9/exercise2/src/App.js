import './App.css';
import StudentCard from './StudentCard';

function App() {
  return (
    <div className="page">
      <div className="section-header">
        <h1 className="page-title">Student Cards</h1>
        <p className="page-subtitle">CSE Batch 2023 — Web Technologies</p>
      </div>
      <div className="cards-grid">
        <StudentCard name="Himavamsi"    department="Computer Science & Engineering" marks={92} />
        <StudentCard name="Arjun Reddy"  department="Electronics & Communication"    marks={85} />
        <StudentCard name="Priya Sharma" department="Information Technology"         marks={78} />
        <StudentCard name="Karthik V"    department="Computer Science & Engineering" marks={67} />
      </div>
    </div>
  );
}

export default App;