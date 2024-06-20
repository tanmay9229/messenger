import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/viewresponses.css'; 

const ViewResponses = () => {
  const [responses, setResponses] = useState([]);
  const [selectedResponse, setSelectedResponse] = useState(null);

  useEffect(() => {
    const fetchResponses = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/responses', {
        headers: { Authorization: token }
      });
      setResponses(response.data);
    };
    fetchResponses();
  }, []);

  const handleViewResponse = async (id) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`http://localhost:3000/responses/${id}`, {
      headers: { Authorization: token }
    });
    setSelectedResponse(response.data);
  };

  return (
    <div className="view-responses-container">
      <h2>View Responses</h2>
      <ul className="responses-list">
        {responses.map(response => (
          <li key={response.id} className="response-item">
            <span>{response.number} - {response.message}</span>
            <button onClick={() => handleViewResponse(response.id)}>View</button>
          </li>
        ))}
      </ul>
      {selectedResponse && (
        <div className="response-details">
          <h3>Response Details</h3>
          <p><strong>From:</strong> {selectedResponse.from}</p>
          <p><strong>To:</strong> {selectedResponse.to}</p>
          <p><strong>Message:</strong> {selectedResponse.message}</p>
          <p><strong>Date:</strong> {selectedResponse.date}</p>
        </div>
      )}
    </div>
  );
};

export default ViewResponses;
