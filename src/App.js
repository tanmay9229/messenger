import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import AddAccount from './Components/AddAccount';
import SendMessage from './Components/SendMessage';
import ViewResponses from './Components/ViewResponses';
import Register from './Components/Register'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-account" element={<AddAccount />} />
        <Route path="/send-message" element={<SendMessage />} />
        <Route path="/view-responses" element={<ViewResponses />} />
      </Routes>
    </Router>
  );
};

export default App;

