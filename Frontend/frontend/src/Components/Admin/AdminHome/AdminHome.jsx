import React, { useState } from 'react';
import './AdminHome.css';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FaUserPlus, FaUserTie, FaMoneyCheckAlt, FaUserCircle } from 'react-icons/fa';
import { MdOutlineEventNote } from 'react-icons/md';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminHome = () => {
  const [stats, setStats] = useState({
    totalEmployees: 120,
    monthlyExpenses: 50000,
    pendingLeaveRequests: 8,
  });

  const cards = [
    { label: 'Add Employee', icon: <FaUserPlus />, link: '/add_employee' },
    { label: 'View Employee details', icon: <FaUserTie />, link: '/view_employee' },
    { label: 'View leave request', icon: <MdOutlineEventNote />, link: '/view_leave' },
    { label: 'My profile', icon: <FaUserCircle />, link: '/admin_profile' },
    { label: 'Salary Reports', icon: <FaMoneyCheckAlt />, link: '/salary_reports' },
  ];

  // Data for the bar chart
  const chartData = {
    labels: ['Total Employees', 'Monthly Expenses', 'Pending Leave Requests'],
    datasets: [
      {
        label: 'Admin Dashboard Stats',
        data: [stats.totalEmployees, stats.monthlyExpenses, stats.pendingLeaveRequests],
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Admin Dashboard Overview',
      },
    },
  };

  const handleGeneratePayroll = () => {
    alert('Payroll batch generated successfully!');
    // Add logic to generate payroll batch-wise
  };

  return (
    <div className="admin-home-container">
      <h2>Admin Panel</h2>

      {/* Dashboard Section */}
      <div className="dashboard">
        <div className="stat">
          <h3>Total Employees</h3>
          <p>{stats.totalEmployees}</p>
        </div>
        <div className="stat">
          <h3>Monthly Salary Expenses</h3>
          <p>${stats.monthlyExpenses.toLocaleString()}</p>
        </div>
        <div className="stat">
          <h3>Pending Leave Requests</h3>
          <p>{stats.pendingLeaveRequests}</p>
        </div>
      </div>

      {/* Graph Section */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Generate Payroll Button */}
      <div className="generate-payroll">
        <button onClick={handleGeneratePayroll}>Generate Payroll</button>
      </div>

      {/* Card Grid Section */}
      <div className="card-grid">
        {cards.map((card, index) => (
          <a href={card.link} className="admin-card" key={index}>
            <div className="icon">{card.icon}</div>
            <span>{card.label}</span>
          </a>
        ))}
      </div>

      {/* Search/Filter Section */}
      <div className="search-filter">
        <h3>Search/Filter Employees</h3>
        <input type="text" placeholder="Search by name, department, etc." />
        <button>Search</button>
      </div>

      {/* Notifications Section */}
      <div className="notifications">
        <h3>Notifications</h3>
        <ul>
          <li>New leave request from Employee #123</li>
          <li>Payroll batch for March generated successfully</li>
          <li>Error: Missing salary data for Employee #456</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
