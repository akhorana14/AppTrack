import React from 'react';
import './static/globals.css';

import Calendar from "./pages/Calendar/Calendar"
import Company from "./pages/Company/Company"
import CreateApplication from "./pages/CreateApplication/CreateApplication"
import SignIn from "./pages/SignIn/SignIn"
import Dashboard from "./pages/Dashboard/Dashboard"
import Profile from "./pages/Profile/Profile"
import Navbar from "./components/Navbar/Navbar"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/profile" element={<Profile version="Account"/>} />
            <Route path="/settings" element={<Profile version="Settings"/>} />
            <Route path="/company/:company" element={<Company />} />
            <Route path="/createApplication" element={<CreateApplication />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
  );
}

export default App;
