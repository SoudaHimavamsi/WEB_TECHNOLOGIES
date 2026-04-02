import './App.css';

function StudentCard(props) {
  const grade =
    props.marks >= 90 ? "O"  :
    props.marks >= 80 ? "A+" :
    props.marks >= 70 ? "A"  :
    props.marks >= 60 ? "B+" : "B";

  const gradeColor =
    props.marks >= 90 ? "#00b4a6" :
    props.marks >= 80 ? "#6366f1" :
    props.marks >= 70 ? "#f59e0b" : "#ef4444";

  return (
    <div className="student-card">
      <div className="card-top">
        <div className="card-avatar">{props.name.charAt(0)}</div>
        <div className="grade-badge" style={{ background: gradeColor }}>{grade}</div>
      </div>
      <h2 className="card-name">{props.name}</h2>
      <p className="card-dept">{props.department}</p>
      <div className="marks-bar-container">
        <div className="marks-label">
          <span>Marks</span>
          <span className="marks-value">{props.marks}/100</span>
        </div>
        <div className="marks-bar-track">
          <div
            className="marks-bar-fill"
            style={{ width: `${props.marks}%`, background: gradeColor }}
          />
        </div>
      </div>
    </div>
  );
}

export default StudentCard;