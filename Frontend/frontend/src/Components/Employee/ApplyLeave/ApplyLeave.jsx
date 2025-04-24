import React, { useState } from 'react';
import './ApplyLeave.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ApplyLeave = () => {
  const [formData, setFormData] = useState({
    from_date: '',
    to_date: '',
    leave_type: '',
    reason: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // ✅ Retrieve token
    console.log('Token:', token); // Log the token to check if it's available

    if (!token) {
      alert('User is not logged in. Please log in to submit a leave request.');
      return;
    }

    console.log('Form Data:', formData); // Log form data to check what's being sent


    try {
      const response = await axios.post(
        'http://localhost:8000/leave-management/leave-requests/', // ✅ Make sure this endpoint is correct
        formData,
        {
          headers: {
            Authorization: `Token ${token}`, // ✅ Send token in headers
          },
        }
      );

      console.log('Response:', response); // Log the response to see if it's successful

      if (response.status === 201) {
        alert('Leave request submitted!');
        setFormData({
          from_date: '',
          to_date: '',
          leave_type: '',
          reason: '',
        });
      } else {
        alert('Something went wrong.');
      }
    } 
    catch (error) {
      console.error('Error submitting leave:', error);
      if (error.response) {
        // Log the response error to get more detailed info from the backend
        console.error('Backend Error:', error.response.data);
        alert(`Submission failed. Error: ${error.response.data}`);
      } else {
        alert('Submission failed. Please check the console for details.');
      }
    }
  };

  return (
    <div>
      <header className="header">
        <h1>Payroll Management System</h1>
      </header>

      <div className="apply-leave-container">
        <h2>Post Leave</h2>
        <form className="leave-form" onSubmit={handleSubmit}>
          <label>Date Range:</label>
          <input type="date" name="from_date" value={formData.from_date} onChange={handleChange} required />
          <input type="date" name="to_date" value={formData.to_date} onChange={handleChange} required />

          <label>Leave type</label>
          <select name="leave_type" value={formData.leave_type} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="casual">Casual Leave</option>
            <option value="sick">Sick Leave</option>
            <option value="earned">Earned Leave</option>
          </select>

          <label>Reason:</label>
          <input type="text" name="reason" value={formData.reason} onChange={handleChange} required />

          <button type="submit">Submit Leave Request</button>
        </form>

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

export default ApplyLeave;
