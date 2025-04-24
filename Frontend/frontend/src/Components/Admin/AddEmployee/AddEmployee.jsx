import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    designation: '',
    base_salary: '',
    bonuses: '',
    deductions: '',
    joining_date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Authentication token is missing. Please log in again.');
      return;
    }

    // Log form data for debugging
    console.log('Form data:', formData);

    try {
      // Send formData directly without any modification
      const response = await axios.post('http://localhost:8000/employee-management/employees/', formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      alert(`Employee added successfully! Employee ID: ${response.data.employee_id}`);
      
      // Clear form after submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        department: '',
        designation: '',
        base_salary: '',
        bonuses: '',
        deductions: '',
        joining_date: '',
      });
    } catch (error) {
      if (error.response) {
        // Log the response data for debugging
        console.error('Error response data:', error.response.data);
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error('Error adding employee:', error);
        alert('Failed to add employee. Please try again.');
      }
    }
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
          name="base_salary"
          placeholder="Base Salary"
          value={formData.base_salary}
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
          name="joining_date"
          placeholder="Joining Date"
          value={formData.joining_date}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
