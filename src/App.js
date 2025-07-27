import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Upload from './components/Upload';

import SkinToneAnalyzer from './components/SkinToneAnalyzer';
import VirtualTryOn from './components/VirtualTryOn';
import SmartWardrobe from './components/SmartWardrobe';

import Community from './components/Community';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skin-analyzer" element={<SkinToneAnalyzer />} />
        <Route path="/smart-wardrobe" element={<SmartWardrobe />} />    
        <Route path="/virtual-tryon" element={<VirtualTryOn />} />
          
              <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </Router>
  );
}

export default App;