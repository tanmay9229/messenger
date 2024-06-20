import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/sendmessage.css'; 

const SendMessage = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [message, setMessage] = useState('');
  const [recipients, setRecipients] = useState('');

  useEffect(() => {
    const fetchAccounts = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/accounts', {
        headers: { Authorization: token }
      });
      setAccounts(response.data);
    };
    fetchAccounts();
  }, []);

  const handleSendMessage = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/send-message', {
      account: selectedAccount,
      message,
      recipients
    }, {
      headers: { Authorization: token }
    });
    setMessage('');
    setRecipients('');
  };

  return (
    <div className="send-message-container">
      <h2>Send Message</h2>
      <select
        className="account-select"
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
      >
        <option value="">Select Account</option>
        {accounts.map(account => (
          <option key={account.id} value={account.id}>{account.number}</option>
        ))}
      </select>
      <textarea
        className="message-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      ></textarea>
      <textarea
        className="recipients-textarea"
        value={recipients}
        onChange={(e) => setRecipients(e.target.value)}
        placeholder="Enter recipient numbers (one per line)"
      ></textarea>
      <button className="send-button" onClick={handleSendMessage}>Send Message</button>
    </div>
  );
};

export default SendMessage;
