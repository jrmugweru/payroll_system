import React from 'react';
import './LeaveStatus.css';
import { Link } from 'react-router-dom'

const LeaveStatus = () => {
  return (
    <div>
    <header className="header">
      <h1>Payroll Management System</h1>
    </header>

    <div className="leave-status-container">
      <h2 className="leave-title">My Leave Status</h2>
      <div className="leave-card">
        <input className="search-bar" type="text" placeholder="🔍 Search..." />
        <div className="leave-details">
          <p><strong>From:</strong> 16/02/2024</p>
          <p><strong>To:</strong> 17/02/2024</p>
          <p><strong>E-Mail:</strong> <strong>employee5@gmail.com</strong></p>
          <p><strong>Leave Type:</strong> Casual Leave</p>
          <p><strong>Reason:</strong> I'm going to my native for some personal works.</p>
          <p><strong>Applied On:</strong> 09/02/2024, 15:31</p>
          <hr />
          <p><strong>Status:</strong> <span className="status pending">Pending</span></p>
          <p><strong>Notes:</strong> <i>Nil</i></p>
          <p><strong>Total Leave's:</strong> <i>Nil</i></p>
        </div>  
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
