import React from 'react'
import './EmployeeHome.css' // Import the CSS file for styling
import { Link } from 'react-router-dom'

const EmployeeHome = () => {
  return (
    <div>
    <header className="header">
      <h1>Payroll Management System</h1>
    </header>

    <div className="home-title">Employee Home</div>

    <div className="grid-container">
      <div className="card">
      <Link to="/employee/home/leave">
        <img
          src="https://img.icons8.com/?size=100&id=46641&format=png&color=000000"
          alt="Apply Leave"
        />
        <div className="card-title">Apply Leave</div>
        </Link>
      </div>

      <div className="card">
      <Link to="/employee/home/leavestatus">
        <img
          src="https://img.icons8.com/fluency/48/approval.png"
          alt="Leave Approval"
        />
        <div className="card-title">View Leave Approval</div>
        </Link>
      </div>

      <div className="card">
        <Link to="/employee/home/salaryslip">
        <img
          src="https://img.icons8.com/?size=100&id=pyTMIrisYjm1&format=png&color=000000"
          alt="Salary Slip"
        />
        <div className="card-title">View Salary Slip</div>
        </Link>
      </div>

      <div className="card">
        <img
          src="https://img.icons8.com/color/48/name.png"
          alt="Profile"
        />
        <div className="card-title">My Profile</div>
      </div>
    </div>

    <footer className="footer">
      <div className="nav-home">🏠 Home</div>
      <div>Logout | ⏱️ 00:18:15</div>
    </footer>
  </div>
  )
}

export default EmployeeHome
