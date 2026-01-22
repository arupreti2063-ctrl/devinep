import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../config/firebase'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user)
    })
    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setIsAdmin(false)
      if (location.pathname === '/admin') {
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-gradient-to-r from-saffron-500 to-sandalwood-400 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <span className="text-3xl"></span>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white font-devanagari group-hover:scale-105 transition-transform">
              डा. देवी नेपाल
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg font-devanagari font-semibold transition-all ${
                isActive('/') ? 'bg-white text-saffron-600' : 'text-white hover:bg-white/20'
              }`}
            >
              गृहपृष्ठ
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-lg font-devanagari font-semibold transition-all ${
                isActive('/about') ? 'bg-white text-saffron-600' : 'text-white hover:bg-white/20'
              }`}
            >
              बारेमा
            </Link>
            <Link
              to="/chhanda-gyan"
              className={`px-4 py-2 rounded-lg font-devanagari font-semibold transition-all ${
                isActive('/chhanda-gyan') ? 'bg-white text-saffron-600' : 'text-white hover:bg-white/20'
              }`}
            >
              छन्द-ज्ञान
            </Link>
            <Link
              to="/lekhan-shilpa"
              className={`px-4 py-2 rounded-lg font-devanagari font-semibold transition-all ${
                isActive('/lekhan-shilpa') ? 'bg-white text-saffron-600' : 'text-white hover:bg-white/20'
              }`}
            >
              लेखन
            </Link>
            <Link
              to="/vigya-vichar"
              className={`px-4 py-2 rounded-lg font-devanagari font-semibold transition-all ${
                isActive('/vigya-vichar') ? 'bg-white text-saffron-600' : 'text-white hover:bg-white/20'
              }`}
            >
             प्राज्ञिक विचार
            </Link>
            <Link
              to="/works"
              className={`px-4 py-2 rounded-lg font-devanagari font-semibold transition-all ${
                isActive('/works') ? 'bg-white text-saffron-600' : 'text-white hover:bg-white/20'
              }`}
            >
              कृतिहरू
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 rounded-lg bg-white text-saffron-600 font-semibold hover:bg-parchment-100 transition-all"
              >
                Admin
              </Link>
            )}
            {isAdmin && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-parchment-200 text-parchment-900 font-semibold hover:bg-parchment-300 transition-all"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link to="/" className="block px-4 py-2 rounded-lg text-white hover:bg-white/20 font-devanagari">
              गृहपृष्ठ
            </Link>
            <Link to="/about" className="block px-4 py-2 rounded-lg text-white hover:bg-white/20 font-devanagari">
              बारेमा
            </Link>
            <Link to="/chhanda-gyan" className="block px-4 py-2 rounded-lg text-white hover:bg-white/20 font-devanagari">
              छन्द-ज्ञान
            </Link>
            <Link to="/lekhan-shilpa" className="block px-4 py-2 rounded-lg text-white hover:bg-white/20 font-devanagari">
              लेखन-शिल्प
            </Link>
            <Link to="/vigya-vichar" className="block px-4 py-2 rounded-lg text-white hover:bg-white/20 font-devanagari">
            प्राज्ञ  विचार
            </Link>
            <Link to="/works" className="block px-4 py-2 rounded-lg text-white hover:bg-white/20 font-devanagari">
              कृतिहरू
            </Link>
            {isAdmin && (
              <>
                <Link to="/admin" className="block px-4 py-2 rounded-lg bg-white text-saffron-600 font-semibold">
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded-lg bg-parchment-200 text-parchment-900 font-semibold"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
