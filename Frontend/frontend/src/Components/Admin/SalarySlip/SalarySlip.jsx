import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './SalarySlip.css';

const SalarySlip = ({ employee }) => {
  const [salaryHistory, setSalaryHistory] = useState([]);

  const calculateNetSalary = (baseSalary, bonuses, deductions, attendance, leaves, overtime) => {
    const perDaySalary = baseSalary / 30; // Assuming 30 days in a month
    const attendancePay = perDaySalary * attendance; // Pay for days worked
    const leaveDeductions = perDaySalary * leaves; // Deduct for unpaid leaves
    const overtimePay = overtime * 100; // Assuming $100 per overtime hour
    const netSalary = attendancePay + bonuses + overtimePay - deductions - leaveDeductions;

    return {
      baseSalary,
      attendancePay,
      bonuses,
      overtimePay,
      deductions,
      leaveDeductions,
      netSalary,
    };
  };

  const generateSalarySlip = () => {
    const {
      baseSalary,
      attendancePay,
      bonuses,
      overtimePay,
      deductions,
      leaveDeductions,
      netSalary,
    } = calculateNetSalary(
      parseFloat(employee.baseSalary),
      parseFloat(employee.bonuses || 0),
      parseFloat(employee.deductions || 0),
      parseFloat(employee.attendance || 0),
      parseFloat(employee.leaves || 0),
      parseFloat(employee.overtime || 0)
    );

    const newSlip = {
      month: new Date().toLocaleString('default', { month: 'long' }),
      year: new Date().getFullYear(),
      baseSalary,
      attendancePay,
      bonuses,
      overtimePay,
      deductions,
      leaveDeductions,
      netSalary,
    };

    setSalaryHistory([...salaryHistory, newSlip]);
    alert(`Salary slip generated for ${newSlip.month} ${newSlip.year}`);
  };

  const downloadPDF = (slip) => {
    const doc = new jsPDF();
    doc.text('Salary Slip', 20, 10);
    doc.autoTable({
      head: [['Description', 'Amount']],
      body: [
        ['Base Salary', `$${slip.baseSalary.toFixed(2)}`],
        ['Attendance Pay', `$${slip.attendancePay.toFixed(2)}`],
        ['Bonuses', `$${slip.bonuses.toFixed(2)}`],
        ['Overtime Pay', `$${slip.overtimePay.toFixed(2)}`],
        ['Deductions', `-$${slip.deductions.toFixed(2)}`],
        ['Leave Deductions', `-$${slip.leaveDeductions.toFixed(2)}`],
        ['Net Salary', `$${slip.netSalary.toFixed(2)}`],
      ],
    });
    doc.save(`${employee.name}_SalarySlip.pdf`);
  };

  return (
    <div className="salary-slip-container">
      <h2>Salary Slip</h2>
      <button onClick={generateSalarySlip}>Generate Salary Slip</button>
      <h3>Salary History</h3>
      <ul>
        {salaryHistory.map((slip, index) => (
          <li key={index}>
            <strong>{slip.month} {slip.year}</strong>: Net Salary - ${slip.netSalary.toFixed(2)}
            <button onClick={() => downloadPDF(slip)}>Download PDF</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalarySlip;