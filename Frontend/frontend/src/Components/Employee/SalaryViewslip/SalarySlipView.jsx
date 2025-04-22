import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import './SalarySlipView.css';
import { Link } from 'react-router-dom';

const SalarySlipView = () => {
  const [showModal, setShowModal] = useState(false);
  const slipRef = useRef();

  const employeeData = {
    name: 'Arun',
    empId: 'KUM005',
    monthYear: 'January 2024',
    designation: 'Software Engineer',
    basicPay: '₹30,000',
    hra: '₹10,000',
    otherAllowances: '₹5,000',
    deductions: '₹2,000',
    netPay: '₹43,000',
  };

  const handlePrint = () => {
    const printContent = slipRef.current.innerHTML;
    const win = window.open('', '', 'width=900,height=650');
    win.document.write('<html><head><title>Salary Slip</title></head><body>');
    win.document.write(printContent);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
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
      <h2>Salary Details</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <table className="salary-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Emp ID</th>
            <th>Month & Year</th>
            <th>Salary Slip</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><a href="#">{employeeData.name}</a></td>
            <td>{employeeData.empId}</td>
            <td>{employeeData.monthYear}</td>
            <td>
              <button className="view-slip-btn" onClick={() => setShowModal(true)}>
                View Salary Slip
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {showModal && (
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
              <button className="print-btn" onClick={handlePrint}>Print</button>
              <button className="download-btn" onClick={handleDownloadPDF}>Download PDF</button>
              <button className="close-btn" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="footer">
      <Link to="/employee/home">  
        <button className="home-btn">Home</button>
        </Link>
        <span className="logout-timer">Logout 00:00:14</span>
      </div>
    </div>
  );
};

export default SalarySlipView;
