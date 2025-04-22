import React from 'react';
import './EmployeeDetails.css';

const employeeData = [
  {
    id: 'KUM001',
    name: 'Kumar',
    email: 'employee1@gmail.com',
    phone: '9876543210',
    address: 'No-1, 1st Street, Mayiladuthurai.',
    designation: 'Developer',
    salary: 30000,
    salaryPerDay: 1000,
    joiningDate: '05/02/2024',
  },
  {
    id: 'KUM002',
    name: 'Ram',
    email: 'employee2@gmail.com',
    phone: '9876543210',
    address: 'No-1, 1st Street, Mayiladuthurai.',
    designation: 'Developer',
    salary: 8000,
    salaryPerDay: 267,
    joiningDate: '05/02/2024',
  },
  // Add more employee objects as needed
];

const EmployeeDetails = () => {
  return (
    <div className="employee-view-container">
      <h2>View Employee Details</h2>
      <input type="text" className="search-box" placeholder="🔍 Search..." />
      <div className="employee-cards">
        {employeeData.map((employee, index) => (
          <div className="employee-card" key={index}>
            <p><strong>Name:</strong> {employee.name}</p>
            <p><strong>ID-Num:</strong> {employee.id}</p>
            <p><strong>E-mail:</strong> {employee.email}</p>
            <p><strong>Mobile-num:</strong> {employee.phone}</p>
            <p><strong>Address:</strong> {employee.address}</p>
            <p><strong>Designation:</strong> {employee.designation}</p>
            <p><strong>Salary:</strong> {employee.salary}</p>
            <p><strong>Salary per day:</strong> {employee.salaryPerDay}</p>
            <p><strong>Date of Joining:</strong> {employee.joiningDate}</p>
            <div className="button-group">
              <button className="btn update">Update</button>
              <button className="btn delete">Delete</button>
              <button className="btn salary">Generate Salary</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDetails;
