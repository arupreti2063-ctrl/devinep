import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, query, orderBy, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { uploadFile } from '../utils/freeStorage'

const AdminDashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('poems')
  const [showLogin, setShowLogin] = useState(true)
  const navigate = useNavigate()

  // लगइनको state - email, password र error भण्डारण गर्ने
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  // सामग्रीको state - कविता, लेख र बाह्य सूचीहरू भण्डारण गर्ने
  const [poems, setPoems] = useState([])
  const [articles, setArticles] = useState([])
  const [externalList, setExternalList] = useState([])

  // सम्पादकको state - नयाँ सामग्री थप्न वा सम्पादन गर्न प्रयोग हुने
  const [showEditor, setShowEditor] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [editorData, setEditorData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    audioFile: null,
    imageFile: null,
    published: true,
    type: 'poem'
  })


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setShowLogin(false)
        loadContent()
      } else {
        setUser(null)
        setShowLogin(true)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const loadContent = async () => {
    try {
      // कविताहरू Firestore बाट लोड गर्ने function
      const poemsRef = collection(db, 'poems')
      const poemsQuery = query(poemsRef, orderBy('createdAt', 'desc'))
      const poemsSnapshot = await getDocs(poemsQuery)
      setPoems(poemsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

      // लेखहरू Firestore बाट लोड गर्ने function
      const articlesRef = collection(db, 'articles')
      const articlesQuery = query(articlesRef, orderBy('createdAt', 'desc'))
      const articlesSnapshot = await getDocs(articlesQuery)
      setArticles(articlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

      // बाह्य सूची Firestore बाट लोड गर्ने function
      const externalRef = collection(db, 'externalList')
      const externalQuery = query(externalRef, orderBy('createdAt', 'desc'))
      const externalSnapshot = await getDocs(externalQuery)
      setExternalList(externalSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    } catch (error) {
      console.error('Error loading content:', error)
      
      // Error blocked requests को कारणले आएको हो कि भनेर जाँच गर्ने
      const errorMessage = error.message || error.toString()
      if (errorMessage.includes('ERR_BLOCKED_BY_CLIENT') || 
          errorMessage.includes('blocked') ||
          errorMessage.includes('network')) {
        console.warn('⚠️ Firebase requests are being blocked by browser extension or ad blocker!')
        alert('⚠️ Content loading blocked!\n\nPlease disable ad blockers or allow Firebase requests.')
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoginError('')

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setShowLogin(false)
    } catch (error) {
      setLoginError('Invalid email or password')
      console.error('Login error:', error)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleFileUpload = async (file, fileType) => {
    if (!file) return null
    try {
      // नि:शुल्क storage प्रयोग गर्ने (छविको लागि Imgur, ऑडियोको लागि base64)
      const url = await uploadFile(file, fileType)
      return url
    } catch (error) {
      console.error('File upload error:', error)
      alert(`Upload failed: ${error.message}`)
      return null
    }
  }

  const handleSave = async () => {
    try {
      let audioUrl = editorData.audioUrl
      let imageUrl = editorData.imageUrl

      // छानिएको फाइलहरू upload गर्ने (नि:शुल्क storage प्रयोग गरेर)
      if (editorData.audioFile) {
        audioUrl = await handleFileUpload(editorData.audioFile, 'audio')
      }
      if (editorData.imageFile) {
        imageUrl = await handleFileUpload(editorData.imageFile, 'image')
      }

      const data = {
        title: editorData.title,
        content: editorData.content || editorData.excerpt,
        excerpt: editorData.excerpt,
        category: editorData.category,
        published: editorData.published,
        audioUrl: audioUrl || null,
        imageUrl: imageUrl || null,
        createdAt: editingItem?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      if (editingItem) {
        // अस्तित्वमा रहेको सामग्री अपडेट गर्ने
        const collectionName = editorData.type === 'poem' ? 'poems' : editorData.type === 'article' ? 'articles' : 'externalList'
        await updateDoc(doc(db, collectionName, editingItem.id), data)
      } else {
        // नयाँ सामग्री सिर्जना गर्ने
        const collectionName = editorData.type === 'poem' ? 'poems' : editorData.type === 'article' ? 'articles' : 'externalList'
        await addDoc(collection(db, collectionName), data)
      }

      setShowEditor(false)
      setEditingItem(null)
      setEditorData({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        audioFile: null,
        imageFile: null,
        published: true,
        type: activeTab === 'poems' ? 'poem' : activeTab === 'articles' ? 'article' : 'external'
      })
      loadContent()
    } catch (error) {
      console.error('Error saving:', error)
      
      // Check if error is due to blocked requests
      const errorMessage = error.message || error.toString()
      if (errorMessage.includes('ERR_BLOCKED_BY_CLIENT') || 
          errorMessage.includes('blocked') ||
          errorMessage.includes('network')) {
        alert('⚠️ Request blocked by browser extension or ad blocker!\n\nPlease:\n1. Disable ad blockers temporarily\n2. Allow Firebase requests\n3. Try again')
      } else if (errorMessage.includes('permission') || errorMessage.includes('Permission')) {
        alert('❌ Permission denied!\n\nPlease check:\n1. You are logged in\n2. Firestore rules allow writes\n3. Your account has admin access')
      } else {
        alert(`Error saving content: ${errorMessage}`)
      }
    }
  }

  const handleDelete = async (id, type) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const collectionName = type === 'poem' ? 'poems' : type === 'article' ? 'articles' : 'externalList'
      await deleteDoc(doc(db, collectionName, id))
      loadContent()
    } catch (error) {
      console.error('Error deleting:', error)
      alert('Error deleting content')
    }
  }


  const openEditor = (item = null, type = null) => {
    if (item) {
      setEditingItem(item)
      setEditorData({
        title: item.title || '',
        content: item.content || item.poem || '',
        excerpt: item.excerpt || '',
        category: item.category || '',
        audioUrl: item.audioUrl || '',
        imageUrl: item.imageUrl || '',
        published: item.published !== false,
        type: type || activeTab === 'poems' ? 'poem' : activeTab === 'articles' ? 'article' : 'external'
      })
    } else {
      setEditingItem(null)
      setEditorData({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        audioFile: null,
        imageFile: null,
        published: true,
        type: type || activeTab === 'poems' ? 'poem' : activeTab === 'articles' ? 'article' : 'external'
      })
    }
    setShowEditor(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin"></div>
          <p className="text-xl text-parchment-700 font-devanagari">लोड हुँदैछ...</p>
        </div>
      </div>
    )
  }

  if (showLogin) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center bg-gradient-to-br from-saffron-50 to-sandalwood-50">
        <div className="card max-w-md w-full">
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">🔐</span>
            <h2 className="text-3xl font-bold text-saffron-700 mb-2 font-devanagari">Admin Login</h2>
            <p className="text-parchment-600 font-devanagari">Secure access only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <div>
              <label className="block text-parchment-700 font-semibold mb-2 text-sm sm:text-base font-devanagari">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-parchment-300 focus:border-saffron-500 focus:outline-none text-base sm:text-lg min-h-[44px]"
                required
              />
            </div>

            <div>
              <label className="block text-parchment-700 font-semibold mb-2 text-sm sm:text-base font-devanagari">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-parchment-300 focus:border-saffron-500 focus:outline-none text-base sm:text-lg min-h-[44px]"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full font-devanagari text-base sm:text-lg min-h-[48px]">
              Sign In
            </button>
          </form>
        </div>
      </div>
    )
  }

  const currentItems = activeTab === 'poems' ? poems : activeTab === 'articles' ? articles : externalList

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-parchment-50 to-sandalwood-50">
      <div className="container mx-auto px-4">
        {/* Header Section - Dashboard को मुख्य शीर्षक र logout button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-saffron-700 mb-2 font-devanagari">Admin Dashboard</h1>
            <p className="text-parchment-600 font-devanagari">Welcome, {user?.email}</p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary font-devanagari">
            Logout
          </button>
        </div>

        {/* Tabs Section - कविता, लेख र बाह्य सूची बीच switch गर्ने tabs */}
        <div className="flex gap-4 mb-8 border-b border-parchment-300">
          {['poems', 'articles', 'external'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-semibold font-devanagari transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-saffron-500 text-saffron-700'
                  : 'border-transparent text-parchment-600 hover:text-saffron-600'
              }`}
            >
              {tab === 'poems' ? 'कविताहरू' : tab === 'articles' ? 'लेखहरू' : 'बाह्य सूची'}
            </button>
          ))}
        </div>

        {/* Content List Section - सामग्रीहरू grid मा देखाउने */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-saffron-700 font-devanagari">
              {activeTab === 'poems' ? 'कविताहरू' : activeTab === 'articles' ? 'लेखहरू' : 'बाह्य सूची'}
            </h2>
            <button
              onClick={() => openEditor()}
              className="btn btn-primary font-devanagari"
            >
              + नयाँ थप्नुहोस्
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.map((item) => (
              <div key={item.id} className="card">
                <h3 className="text-xl font-bold text-saffron-700 mb-2 font-devanagari line-clamp-2">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-parchment-700 mb-4 font-devanagari line-clamp-2">
                    {item.excerpt}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditor(item, activeTab === 'poems' ? 'poem' : activeTab === 'articles' ? 'article' : 'external')}
                    className="btn btn-secondary text-sm font-devanagari"
                  >
                    सम्पादन
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, activeTab === 'poems' ? 'poem' : activeTab === 'articles' ? 'article' : 'external')}
                    className="btn bg-red-500 text-white hover:bg-red-600 text-sm font-devanagari"
                  >
                    मेटाउनुहोस्
                  </button>
                </div>
              </div>
            ))}
          </div>

          {currentItems.length === 0 && (
            <div className="text-center py-16 card">
              <p className="text-parchment-600 font-devanagari">
                अहिलेसम्म कुनै सामग्री छैन। नयाँ थप्नुहोस्!
              </p>
            </div>
          )}
        </div>

        {/* Editor Modal - नयाँ सामग्री थप्न वा सम्पादन गर्ने modal */}
        {showEditor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-parchment-200 p-4 sm:p-6 flex justify-between items-center z-10">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-saffron-700 font-devanagari pr-2">
                  {editingItem ? 'सम्पादन गर्नुहोस्' : 'नयाँ सामग्री थप्नुहोस्'}
                </h2>
                <button
                  onClick={() => setShowEditor(false)}
                  className="text-2xl sm:text-3xl text-parchment-600 hover:text-parchment-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <div>
                  <label className="block text-parchment-700 font-semibold mb-2 text-sm sm:text-base font-devanagari">शीर्षक</label>
                  <input
                    type="text"
                    value={editorData.title}
                    onChange={(e) => setEditorData({ ...editorData, title: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-parchment-300 focus:border-saffron-500 focus:outline-none font-devanagari text-base sm:text-lg min-h-[44px]"
                    placeholder="शीर्षक प्रविष्ट गर्नुहोस्"
                  />
                </div>

                <div>
                  <label className="block text-parchment-700 font-semibold mb-2 text-sm sm:text-base font-devanagari">सारांश</label>
                  <textarea
                    value={editorData.excerpt}
                    onChange={(e) => setEditorData({ ...editorData, excerpt: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-parchment-300 focus:border-saffron-500 focus:outline-none font-devanagari text-base sm:text-lg"
                    rows="3"
                    placeholder="संक्षिप्त विवरण"
                  />
                </div>

                <div>
                  <label className="block text-parchment-700 font-semibold mb-2 text-sm sm:text-base font-devanagari">विस्तृत विवरण</label>
                  <textarea
                    value={editorData.content}
                    onChange={(e) => setEditorData({ ...editorData, content: e.target.value })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-parchment-300 focus:border-saffron-500 focus:outline-none font-devanagari text-base sm:text-lg"
                    rows="6"
                    placeholder="पूर्ण विवरण/कविता"
                  />
                </div>

                {editorData.type !== 'external' && (
                  <div>
                    <label className="block text-parchment-700 font-semibold mb-2 text-sm sm:text-base font-devanagari">श्रेणी</label>
                    <input
                      type="text"
                      value={editorData.category}
                      onChange={(e) => setEditorData({ ...editorData, category: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-parchment-300 focus:border-saffron-500 focus:outline-none font-devanagari text-base sm:text-lg min-h-[44px]"
                      placeholder="श्रेणी (जस्तै: आलोचना, समीक्षा, आदि)"
                    />
                  </div>
                )}

                {editorData.type === 'poem' && (
                  <div>
                    <label className="block text-parchment-700 font-semibold mb-2 text-sm sm:text-base font-devanagari">🎵 ऑडियो फाइल</label>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={(e) => setEditorData({ ...editorData, audioFile: e.target.files[0] })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-parchment-300 focus:border-saffron-500 focus:outline-none text-sm sm:text-base min-h-[44px]"
                    />
                    {editorData.audioUrl && (
                      <p className="text-xs sm:text-sm text-parchment-600 mt-2 break-all">Current: {editorData.audioUrl}</p>
                    )}
                  </div>
                )}

                {(editorData.type === 'article' || editorData.type === 'external') && (
                  <div>
                    <label className="block text-parchment-700 font-semibold mb-2 text-sm sm:text-base font-devanagari">🖼️ छवि फाइल</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditorData({ ...editorData, imageFile: e.target.files[0] })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-parchment-300 focus:border-saffron-500 focus:outline-none text-sm sm:text-base min-h-[44px]"
                    />
                    {editorData.imageUrl && (
                      <p className="text-xs sm:text-sm text-parchment-600 mt-2 break-all">Current: {editorData.imageUrl}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editorData.published}
                      onChange={(e) => setEditorData({ ...editorData, published: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <span className="text-parchment-700 font-semibold font-devanagari">तुरुन्त प्रकाशन गर्नुहोस्</span>
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-end">
                  <button
                    onClick={() => setShowEditor(false)}
                    className="btn btn-secondary font-devanagari text-base sm:text-lg w-full sm:w-auto min-h-[48px]"
                  >
                    रद्द गर्नुहोस्
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-primary font-devanagari text-base sm:text-lg w-full sm:w-auto min-h-[48px]"
                  >
                    सेभ गर्नुहोस्
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
