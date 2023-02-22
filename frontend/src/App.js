import React from 'react';
import './static/globals.css';

import Calendar from "./pages/Calendar/Calendar"
import Company from "./pages/Company/Company"
import Profile from "./pages/Profile/Profile"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile version="Account"/>} />
            <Route path="/settings" element={<Profile version="Settings"/>} />
            <Route path="/company/:company" element={<Company />} />
        </Routes>
    </Router>
  );
}

export default App;
