import React, { useState } from 'react';
import './AddEmployee.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    baseSalary: '',
    bonuses: '',
    deductions: '',
    joiningDate: '',
  });

  // Function to generate a unique employee ID
  const generateEmployeeId = () => {
    const prefix = 'EMP'; // Prefix for the employee ID
    const uniqueNumber = Date.now().toString().slice(-5); // Use the last 5 digits of the current timestamp
    return `${prefix}-${uniqueNumber}`;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const uniqueId = generateEmployeeId(); // Generate a unique ID
    const newEmployeeData = { ...formData, employeeId: uniqueId }; // Add the unique ID to the form data

    // Replace with your API logic or data handling
    console.log('Employee Data:', newEmployeeData);
    alert(`Employee added successfully! Employee ID: ${uniqueId}`);

    setFormData({
      employeeId: '',
      name: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      baseSalary: '',
      bonuses: '',
      deductions: '',
      joiningDate: '',
    });
  };

  return (
    <div className="add-employee-container">
      <h2>Add Employee</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="designation"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="baseSalary"
          placeholder="Base Salary"
          value={formData.baseSalary}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bonuses"
          placeholder="Bonuses"
          value={formData.bonuses}
          onChange={handleChange}
        />
        <input
          type="number"
          name="deductions"
          placeholder="Deductions"
          value={formData.deductions}
          onChange={handleChange}
        />
        <input
          type="date"
          name="joiningDate"
          placeholder="Joining Date"
          value={formData.joiningDate}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
