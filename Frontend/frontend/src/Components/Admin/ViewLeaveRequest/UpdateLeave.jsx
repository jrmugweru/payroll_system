import React, { useState } from 'react';
import './UpdateLeave.css';

const UpdateLeave = () => {
  const [status, setStatus] = useState('Pending');
  const [days, setDays] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ status, days, notes });
    // Submit logic here
  };

  return (
    <div className="update-leave-container">
      <h2>Update Leave Approval</h2>
      <form className="update-leave-form" onSubmit={handleSubmit}>
        <label htmlFor="status">Update Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <label htmlFor="days">Total Leave Days:</label>
        <input
          type="number"
          id="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        />

        <label htmlFor="notes">Notes:</label>
        <input
          type="text"
          id="notes"
          value={notes}
          placeholder="Nil"
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateLeave;
