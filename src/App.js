import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './components/Upload';

 // Only this one!
 import SkinToneAnalyzer from './features/SkinToneAnalyzer/attached_assets/SkinToneAnalyzer'; // Adjust path if needed
// if using aliases


import VirtualTryOn from './components/VirtualTryOn';



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skin-analyzer" element={<SkinToneAnalyzer />} />
            
         <Route path="/virtual-tryon" element={<VirtualTryOn />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;
