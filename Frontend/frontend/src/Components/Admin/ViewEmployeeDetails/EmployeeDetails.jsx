import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EmployeeDetails.css';

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/employee-management/employees/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDownloadSlip = async (employeeId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8000/employee-management/salary-slip/${employeeId}/`, {
        responseType: 'blob',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
  
      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `salary_slip_${employeeId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading salary slip:", error);
    }
  };
  
  

  const handleDelete = async (employeeId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/employee-management/employees/${employeeId}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setEmployees((prev) => prev.filter((emp) => emp.employee_id !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleEditClick = (employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditingEmployee({ ...editingEmployee, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        `http://localhost:8000/employee-management/employees/${editingEmployee.employee_id}/`,
        editingEmployee,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
          },
        }
      );
      setEmployees(prev =>
        prev.map(emp => emp.employee_id === editingEmployee.employee_id ? response.data : emp)
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="employee-view-container">
      <h2>All Employees</h2>
      <input
        type="text"
        className="search-box"
        placeholder="Search by name or department..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="employee-cards">
        {employees
          .filter((emp) =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((emp) => (
            <div className="employee-card" key={emp.employee_id}>
              <p><strong>Name:</strong> {emp.name}</p>
              <p><strong>Email:</strong> {emp.email}</p>
              <p><strong>Phone:</strong> {emp.phone}</p>
              <p><strong>Department:</strong> {emp.department}</p>
              <p><strong>Designation:</strong> {emp.designation}</p>
              <p><strong>Base Salary:</strong> KES {emp.base_salary}</p>
              <p><strong>Bonuses:</strong> KES {emp.bonuses}</p>
              <p><strong>Deductions:</strong> KES {emp.deductions}</p>
              <p><strong>Joining Date:</strong> {emp.joining_date}</p>
              <div className="button-group">
                <button className="btn update" onClick={() => handleEditClick(emp)}>Update</button>
                <button className="btn delete" onClick={() => handleDelete(emp.employee_id)}>Delete</button>
                <button className="btn salary" onClick={() => handleDownloadSlip(emp.employee_id)}>Salary Slip</button>

              </div>
            </div>
          ))}
      </div>

      {isModalOpen && editingEmployee && (
        <div className="modal">
          <form className="employee-form" onSubmit={handleUpdateSubmit}>
            <input type="text" name="name" value={editingEmployee.name} onChange={handleEditChange} required />
            <input type="email" name="email" value={editingEmployee.email} onChange={handleEditChange} required />
            <input type="tel" name="phone" value={editingEmployee.phone} onChange={handleEditChange} required />
            <input type="text" name="department" value={editingEmployee.department} onChange={handleEditChange} required />
            <input type="text" name="designation" value={editingEmployee.designation} onChange={handleEditChange} required />
            <input type="number" name="base_salary" value={editingEmployee.base_salary} onChange={handleEditChange} required />
            <input type="number" name="bonuses" value={editingEmployee.bonuses} onChange={handleEditChange} />
            <input type="number" name="deductions" value={editingEmployee.deductions} onChange={handleEditChange} />
            <input type="date" name="joining_date" value={editingEmployee.joining_date} onChange={handleEditChange} required />
            <div className="button-group">
              <button type="submit" className="btn update">Save Changes</button>
              <button type="button" className="btn delete" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ViewEmployees;
