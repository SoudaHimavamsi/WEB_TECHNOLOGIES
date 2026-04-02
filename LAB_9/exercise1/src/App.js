import './App.css';

function StudentProfile() {
  const name = "Himavamsi";
  const regNo = "23BCE8209";
  const department = "Computer Science & Engineering";
  const year = 2;
  const section = "A";
  const college = "VIT Andhra Pradesh";

  return (
    <div className="page">
      <div className="profile-card">
        <div className="avatar">{name.charAt(0)}</div>
        <h1 className="student-name">{name}</h1>
        <span className="reg-badge">{regNo}</span>
        <div className="divider" />
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Department</span>
            <span className="detail-value">{department}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Year</span>
            <span className="detail-value">{year}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Section</span>
            <span className="detail-value">{section}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">College</span>
            <span className="detail-value">{college}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;