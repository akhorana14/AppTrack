import React from 'react';
import './static/globals.css';

import Calendar from "./pages/Calendar/Calendar"
import Company from "./pages/Company/Company"
import SignIn from "./pages/SignIn/SignIn"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/company/:company" element={<Company />} />
        </Routes>
    </Router>
  );
}

export default App;
