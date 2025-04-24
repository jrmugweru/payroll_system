import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateLeave.css';

const UpdateLeave = () => {
  const { leaveId } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('PENDING');
  const [days, setDays] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [leaveData, setLeaveData] = useState(null);

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:8000/leave-management/leaves/${leaveId}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setLeaveData(response.data);
        setStatus(response.data.status);
        setDays(
          Math.ceil(
            (new Date(response.data.end_date) - new Date(response.data.start_date)) /
              (1000 * 60 * 60 * 24)
          ) + 1
        );
      } catch (err) {
        setError('Failed to fetch leave data');
        console.error(err);
      }
    };

    fetchLeave();
  }, [leaveId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `http://localhost:8000/leave-management/leave-requests/${leaveId}/`,
        {
          status,
          notes, // only included if your model supports it
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert('Leave status updated successfully!');
        navigate('/admin/dashboard'); // redirect after success
      }
    } catch (err) {
      setError('Update failed');
      console.error(err);
    }
  };

  if (!leaveData) return <p>Loading leave data...</p>;

  return (
    <div className="update-leave-container">
      <h2>Update Leave Approval</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form className="update-leave-form" onSubmit={handleSubmit}>
        <p><strong>Employee:</strong> {leaveData.employee}</p>
        <p><strong>From:</strong> {leaveData.start_date} - <strong>To:</strong> {leaveData.end_date}</p>
        <p><strong>Reason:</strong> {leaveData.reason}</p>

        <label htmlFor="status">Update Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <label htmlFor="days">Total Leave Days</label>
        <input
          type="number"
          id="days"
          value={days}
          readOnly
        />

        <label htmlFor="notes">Admin Notes (Optional)</label>
        <input
          type="text"
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateLeave;
