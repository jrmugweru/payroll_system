import { Routes, Route } from 'react-router-dom';
import Home from './Components/Homepage/Homepage.jsx';
import AdminRegister from './Components/Register/AdminRegister.jsx';
import EmployeeRegister from './Components/Register/EmployeeRegister.jsx';
import AdminLogin from './Components/AdminLogIn/AdminLogin.jsx';
import EmployeeLogin from './Components/EmployeeLogIn/Employee.jsx';
import EmployeeHome from './Components/Employee/EmployeeHome/EmployeeHome.jsx';
import ApplyLeave from './Components/Employee/ApplyLeave/ApplyLeave.jsx';
import LeaveStatus from './Components/Employee/LeaveStatus/LeaveStatus.jsx';
import SalarySlipView from './Components/Employee/SalaryViewslip/SalarySlipView.jsx';
import Profile from './Components/Employee/Profile/profile.jsx';
import AdminHome from './Components/Admin/AdminHome/AdminHome.jsx';
import AddEmployee from './Components/Admin/AddEmployee/AddEmployee.jsx';
import EmployeeDetails from './Components/Admin/ViewEmployeeDetails/EmployeeDetails.jsx';
import UpdateLeave from './Components/Admin/ViewLeaveRequest/UpdateLeave.jsx';
import SalarySlip from './Components/Admin/SalarySlip/SalarySlip.jsx';

function App() {
  return (
    <Routes>
      <Route path="/salary_reports" element={<SalarySlip />} />
      <Route path="/admin/home/admin_profile" element={<Profile />} />
      <Route path="/view_leave" element={<UpdateLeave />} />
      <Route path="/view_employee" element={<EmployeeDetails />} />
      <Route path="/add_employee" element={<AddEmployee />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/employee/home/salaryslip" element={<SalarySlipView />} />
      <Route path="/employee/home/profile" element={<Profile />} />
      <Route path="/employee/home/leavestatus" element={<LeaveStatus />} />
      <Route path="/employee/home" element={<EmployeeHome />} />
      <Route path="/employee/home/leave" element={<ApplyLeave />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/employee" element={<EmployeeLogin />} />
      <Route path="/register/admin" element={<AdminRegister role="Admin" />} />
      <Route path="/register/employee" element={<EmployeeRegister role="Employee" />} />
    </Routes>
  );
}

export default App;
