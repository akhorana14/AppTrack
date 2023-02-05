import React from 'react';
import './App.css';
//import './componentsHeader';

import Calendar from "./pages/Calendar/Calendar"
import Company from "./pages/Company/Company"

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Routes>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/company/:company" element={<Company />} />
        </Routes>
    </Router>
  );
}

export default App;
