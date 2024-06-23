import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';

import RegisterUser from './components/RegisterUser';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      
        <Route path="/register-user" element={<RegisterUser />} />
    
      </Routes>
    </Router>
  );
}

export default App;
