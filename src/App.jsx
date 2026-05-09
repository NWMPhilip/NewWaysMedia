import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Forside from './components/Forside';
import Podcasts from './pages/Podcasts';
import PodcastDetails from './pages/PodcastDetails'; // Ny side
import Contact from './pages/Contact';
import DustBackground from './components/DustBackground';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-bg-dark overflow-x-hidden text-text-white">
        <DustBackground />
        <Navbar />
        
        <main className="flex-1 w-full relative z-0">
          <Routes>
            <Route path="/" element={<div className="pt-32"><Forside /></div>} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/podcast/:slug" element={<PodcastDetails />} />
            <Route path="/kontakt" element={<div className="pt-32"><Contact /></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
