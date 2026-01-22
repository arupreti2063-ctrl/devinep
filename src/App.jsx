import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Works from './pages/Works'
import ChhandaGyan from './pages/ChhandaGyan'
import LekhanShilpa from './pages/LekhanShilpa'
import VigyaVichar from './pages/VigyaVichar'
import AdminDashboard from './pages/AdminDashboard'
import Footer from './components/Footer'

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow mandala-bg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="/chhanda-gyan" element={<ChhandaGyan />} />
            <Route path="/lekhan-shilpa" element={<LekhanShilpa />} />
            <Route path="/vigya-vichar" element={<VigyaVichar />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
