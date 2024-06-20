import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/dashboard.css'; 

const Dashboard = () => {
  const [counts, setCounts] = useState({ accounts: 0, messagesSent: 0, messagesReceived: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/dashboard', {
        headers: { Authorization: token }
      });
      setCounts(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="count-item">Accounts: <span>{counts.accounts}</span></div>
      <div className="count-item">Messages Sent: <span>{counts.messagesSent}</span></div>
      <div className="count-item">Messages Received: <span>{counts.messagesReceived}</span></div>
    </div>
  );
};

export default Dashboard;
