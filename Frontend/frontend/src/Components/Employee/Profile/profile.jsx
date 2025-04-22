import React from 'react';
import './Profile.css';

const Profile = () => {
  const employee = {
    name: 'Arun Kumar',
    empId: 'KUM005',
    email: 'arun@example.com',
    phone: '+91-9876543210',
    department: 'IT',
    designation: 'Software Engineer',
    joiningDate: '10-Apr-2022',
    manager: 'Ramesh Singh',
    netSalary: '₹43,000',
    lastPaidMonth: 'January 2024',
    workingDays: 22,
    presentDays: 20,
    leavesTaken: 2,
    holidays: ['26-Jan (Republic Day)', '14-Apr (Ambedkar Jayanti)'],
    documents: [
      { name: 'PAN Card', url: '#' },
      { name: 'Aadhaar Card', url: '#' },
      { name: 'Resume', url: '#' },
    ],
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      {/* Basic Info */}
      <div className="profile-card">
        <img src="/avatar.png" alt="Profile" className="avatar" />
        <h3>{employee.name}</h3>
        <p><strong>Employee ID:</strong> {employee.empId}</p>
        <p><strong>Designation:</strong> {employee.designation}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Joining Date:</strong> {employee.joiningDate}</p>
        <p><strong>Reporting Manager:</strong> {employee.manager}</p>
      </div>

      {/* Salary Summary */}
      <div className="section">
        <h3>Salary Summary</h3>
        <p><strong>Net Salary:</strong> {employee.netSalary}</p>
        <p><strong>Last Paid Month:</strong> {employee.lastPaidMonth}</p>
        <button className="link-btn">View Full Salary History</button>
      </div>

      {/* Attendance Overview */}
      <div className="section">
        <h3>Attendance Overview</h3>
        <p><strong>Working Days:</strong> {employee.workingDays}</p>
        <p><strong>Present:</strong> {employee.presentDays}</p>
        <p><strong>Leaves Taken:</strong> {employee.leavesTaken}</p>
        <p><strong>Upcoming Holidays:</strong></p>
        <ul>
          {employee.holidays.map((holiday, index) => (
            <li key={index}>{holiday}</li>
          ))}
        </ul>
      </div>

      {/* Documents */}
      <div className="section">
        <h3>Documents</h3>
        <ul>
          {employee.documents.map((doc, index) => (
            <li key={index}>
              {doc.name} <a href={doc.url} className="link-btn">View</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Settings / Actions */}
      <div className="actions">
        <button>Edit Profile</button>
        <button>Change Password</button>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
};

export default Profile;