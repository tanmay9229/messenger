import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import '../css/addaccount.css'; 

const AddAccount = () => {
  const [accounts, setAccounts] = useState([]);
  const [newNumber, setNewNumber] = useState('');
  const [qrCode, setQrCode] = useState('');

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

  const handleAddAccount = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3000/accounts', { number: newNumber }, {
      headers: { Authorization: token }
    });
    setAccounts([...accounts, response.data]);
    setNewNumber('');
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?data=${newNumber}`);
  };

  return (
    <div className="add-account-container">
      <h2>Add Account</h2>
      <div className="input-group">
        <input
          type="text"
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          placeholder="Enter WhatsApp Number"
        />
        <button onClick={handleAddAccount}>Add Account</button>
      </div>
      {qrCode && <QRCode value={qrCode} />}
      <ul className="accounts-list">
        {accounts.map(account => (
          <li key={account.id}>
            <span>{account.number}</span> - <span>{account.date_added}</span> - <span>{account.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddAccount;

