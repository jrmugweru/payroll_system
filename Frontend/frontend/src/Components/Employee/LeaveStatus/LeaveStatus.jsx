import React, { useState, useEffect } from 'react';
import './LeaveStatus.css';
import { Link } from 'react-router-dom';

const LeaveStatus = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/leave-management/leave-requests/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        const data = await response.json();
        setLeaveData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leave data:', error);
        setLoading(false);
      }
    };

    fetchLeaveData();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (leaveData.length === 0) return <div>No leave data available</div>;

  return (
    <div>
      <header className="header">
        <h1>Payroll Management System</h1>
      </header>

      <div className="leave-status-container">
        <h2 className="leave-title">My Leave Status</h2>

        <input className="search-bar" type="text" placeholder="🔍 Search..." />

<div className="leave-card-wrapper">
  {leaveData.map((leave, index) => (
    <div className="leave-card" key={index}>
      <div className="leave-details">
        <p><strong>From:</strong> {leave.from_date}</p>
        <p><strong>To:</strong> {leave.to_date}</p>
        <p><strong>E-Mail:</strong> {leave.email || 'N/A'}</p>
        <p><strong>Leave Type:</strong> {leave.leave_type}</p>
        <p><strong>Reason:</strong> {leave.reason}</p>
        <p><strong>Applied On:</strong> {leave.submitted_at || 'N/A'}</p>
        <hr />
        <p><strong>Status:</strong> <span className={`status ${leave.status?.toLowerCase()}`}>{leave.status}</span></p>
        <p><strong>Notes:</strong> <i>{leave.notes || 'Nil'}</i></p>
        <p><strong>Total Leave's:</strong> <i>{leave.total_leaves || 'Nil'}</i></p>
      </div>
    </div>
  ))}
</div>


        <footer className="footer">
          <Link to="/employee/home">
            <div className="nav-home">🏠 Home</div>
          </Link>
          <div>Logout | ⏱️ 00:18:15</div>
        </footer>
      </div>
    </div>
  );
};

export default LeaveStatus;
