import React from 'react';
import './static/globals.css';

import Calendar from "./pages/Calendar/Calendar"
import Company from "./pages/Company/Company"
import CreateApplication from "./pages/CreateApplication/CreateApplication"
<<<<<<< HEAD
=======
import SignIn from "./pages/SignIn/SignIn"
import Dashboard from "./pages/Dashboard/Dashboard"
>>>>>>> main

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/" element={<SignIn />} />
            <Route path="/company/:company" element={<Company />} />
            <Route path="/createApplication" element={<CreateApplication />} />
<<<<<<< HEAD
=======
            <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> main
        </Routes>
    </Router>
  );
}

export default App;
