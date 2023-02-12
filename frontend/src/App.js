import React from 'react';
import './static/globals.css';

import Calendar from "./pages/Calendar/Calendar"
import Company from "./pages/Company/Company"
import Dashboard from "./pages/Dashboard/Dashboard"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/company/:company" element={<Company />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
