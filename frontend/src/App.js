import React from 'react';
import './static/globals.css';

import Calendar from "./pages/Calendar/Calendar"
import Company from "./pages/Company/Company"
import CreateApplication from "./pages/CreateApplication/CreateApplication"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/company/:company" element={<Company />} />
            <Route path="/createApplication" element={<CreateApplication />} />
        </Routes>
    </Router>
  );
}

export default App;
