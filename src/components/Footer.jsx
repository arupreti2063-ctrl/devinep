import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/firebase'

const Footer = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const vedicQuotes = [
    
    "वसुधैव कुटुम्बकम्",
    "सर्वे भवन्तु सुखिनः"
  ]

  const randomQuote = vedicQuotes[Math.floor(Math.random() * vedicQuotes.length)]

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user)
    })
    return () => unsubscribe()
  }, [])

  return (
    <footer className="bg-gradient-to-r from-parchment-800 to-parchment-900 text-parchment-100 mt-auto relative">
      {/* Admin Icon in Corner - Always Visible */}
      <Link
        to="/admin"
        className="fixed sm:absolute bottom-4 right-4 z-50 bg-saffron-500 hover:bg-saffron-600 text-white rounded-full p-3 sm:p-2 shadow-lg transition-all hover:scale-110 min-w-[48px] min-h-[48px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center"
        aria-label={isAdmin ? "Admin Dashboard" : "Admin Login"}
        title={isAdmin ? "Admin Dashboard" : "Admin Login"}
      >
        {isAdmin ? (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        )}
      </Link>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-20 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* About Section */}
          <div>
            <p className="text-parchment-200 font-devanagari mb-4">
              प्रा. डा. देवी नेपालको व्यक्तिगत ब्रान्ड वेबसाइट
            </p>
            <p className="text-sm text-parchment-300">
              छन्द-ज्ञान, लेखन-शिल्प, र प्राज्ञ विचारको प्रस्तुति
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-saffron-300 font-devanagari">द्रुत लिङ्कहरू</h4>
            <ul className="space-y-2 font-devanagari">
              <li>
                <Link to="/" className="hover:text-saffron-300 transition-colors">
                  गृहपृष्ठ
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-saffron-300 transition-colors">
                  बारेमा
                </Link>
              </li>
              <li>
                <Link to="/chhanda-gyan" className="hover:text-saffron-300 transition-colors">
                  छन्द-ज्ञान
                </Link>
              </li>
              <li>
                <Link to="/lekhan-shilpa" className="hover:text-saffron-300 transition-colors">
                  लेखन
                </Link>
              </li>
              <li>
                <Link to="/vigya-vichar" className="hover:text-saffron-300 transition-colors">
                  प्राज्ञिक विचार
                </Link>
              </li>
              <li>
                <Link to="/works" className="hover:text-saffron-300 transition-colors">
                  कृतिहरू
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-saffron-300 font-devanagari">सम्पर्क</h4>
            <p className="text-parchment-200 font-devanagari mb-2">
              प्रा. डा. देवी नेपाल
            </p>
            <p className="text-sm text-parchment-300">
               वाल्मीकि  क्याम्पस, काठमाडौं
            </p>
            <p className="text-sm text-parchment-300 mt-2">
             
            </p>
            {/* Facebook Contact Link */}
            <a
              href="https://www.facebook.com/devi.nepal.3"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-devanagari text-sm sm:text-base min-h-[44px]"
              aria-label="Facebook Profile"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
              <span>Facebook मा सम्पर्क</span>
            </a>
          </div>
        </div>

        {/* Vedic Quote */}
        <div className="border-t border-parchment-700 pt-6 sm:pt-8 text-center">
          <p className="text-lg sm:text-xl font-bold text-saffron-300 font-devanagari italic px-2 mb-2">
            "{randomQuote}"
          </p>
          <p className="text-xs sm:text-sm text-parchment-400 px-4">
            {randomQuote === "सत्यमेव जयते" && "मुण्डकोपनिषद - Truth alone triumphs"}
            {randomQuote === "वसुधैव कुटुम्बकम्" && "महोपनिषद - The world is one family"}
            {randomQuote === "सर्वे भवन्तु सुखिनः" && "गरुड़ पुराण - May all be happy"}
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-parchment-700 pt-6 mt-6 text-center">
          <p className="text-sm text-parchment-400">
            &copy; {new Date().getFullYear()} डा. देवी नेपाल. सर्वाधिकार सुरक्षित.
          </p>
          <p className="text-xs text-parchment-500 mt-2">
            Created by{' '}
            <a
              href="https://www.facebook.com/arr.to.792"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-saffron-300 transition-colors underline"
            >
              Anup Upreti
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
