import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import './SalarySlipView.css';
import { Link } from 'react-router-dom';

const SalarySlipView = () => {
  const [empIdInput, setEmpIdInput] = useState('');
  const [employeeData, setEmployeeData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const slipRef = useRef();

  const fetchSalarySlip = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("You're not logged in!");
        return;
      }
  
      const response = await fetch(`http://127.0.0.1:8000/employee-management/generate-salary-slip/${empIdInput}/`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch salary slip');
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank'); // or use download logic if preferred
    } catch (error) {
      console.error('Error fetching salary slip:', error);
      alert('Authentication failed or employee not found.');
    }
  };
  

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`Salary Slip - ${employeeData.monthYear}`, 20, 20);
    let y = 30;
    const fields = [
      ['Name', employeeData.name],
      ['Employee ID', employeeData.empId],
      ['Designation', employeeData.designation],
      ['Basic Pay', employeeData.basicPay],
      ['HRA', employeeData.hra],
      ['Other Allowances', employeeData.otherAllowances],
      ['Deductions', employeeData.deductions],
      ['Net Pay', employeeData.netPay],
    ];
    fields.forEach(([key, value]) => {
      doc.text(`${key}: ${value}`, 20, y);
      y += 10;
    });
    doc.save(`SalarySlip_${employeeData.empId}.pdf`);
  };

  return (
    <div className="salary-slip-container">
      <h2>Search Salary Slip</h2>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Enter Employee ID" 
          value={empIdInput}
          onChange={(e) => setEmpIdInput(e.target.value)}
        />
        <button onClick={fetchSalarySlip}>Search</button>
      </div>

      {employeeData && (
        <div className="salary-result">
          <table className="salary-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Emp ID</th>
                <th>Month & Year</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{employeeData.name}</td>
                <td>{employeeData.empId}</td>
                <td>{employeeData.monthYear}</td>
                <td>
                  <button onClick={() => setShowModal(true)}>View</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {showModal && employeeData && (
        <div className="modal-backdrop">
          <div className="modal" ref={slipRef}>
            <h3>Salary Slip - {employeeData.monthYear}</h3>
            <p><strong>Name:</strong> {employeeData.name}</p>
            <p><strong>Employee ID:</strong> {employeeData.empId}</p>
            <p><strong>Designation:</strong> {employeeData.designation}</p>
            <p><strong>Basic Pay:</strong> {employeeData.basicPay}</p>
            <p><strong>HRA:</strong> {employeeData.hra}</p>
            <p><strong>Other Allowances:</strong> {employeeData.otherAllowances}</p>
            <p><strong>Deductions:</strong> {employeeData.deductions}</p>
            <p><strong>Net Pay:</strong> {employeeData.netPay}</p>
            <div className="modal-actions">
              <button onClick={handleDownloadPDF}>Download PDF</button>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default SalarySlipView;
