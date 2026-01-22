import React, { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import LikeButton from '../components/LikeButton'
import CommentsSection from '../components/CommentsSection'
import AudioPlayer from '../components/AudioPlayer'
// Images import गर्ने - deployment को लागि src folder मा राखिएको
import headerImage from '../assets/images/image.png'
import backgroundImage from '../assets/images/image-copy.png'

const LekhanShilpa = () => {
  const [articles, setArticles] = useState([])
  const [poems, setPoems] = useState([])
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [selectedPoem, setSelectedPoem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Firebase बाट real-time data fetch गर्ने (static/fallback data छैन)
    const fetchData = async () => {
      try {
        // लेख र कविताहरू parallel मा fetch गर्ने
        const [articlesSnapshot, poemsSnapshot] = await Promise.allSettled([
          // लेखहरू fetch गर्ने function
          (async () => {
            const articlesRef = collection(db, 'articles')
            try {
              const q = query(articlesRef, orderBy('createdAt', 'desc'))
              return await getDocs(q)
            } catch (orderError) {
              console.log('OrderBy failed, fetching all articles:', orderError)
              return await getDocs(articlesRef)
            }
          })(),
          // कविताहरू fetch गर्ने function
          (async () => {
            const poemsRef = collection(db, 'poems')
            try {
              const q = query(poemsRef, orderBy('createdAt', 'desc'))
              return await getDocs(q)
            } catch (orderError) {
              console.log('OrderBy failed for poems, fetching all:', orderError)
              return await getDocs(poemsRef)
            }
          })()
        ])

        // लेखहरू process गर्ने - date format गरेर र published filter गरेर
        if (articlesSnapshot.status === 'fulfilled') {
          const articlesList = articlesSnapshot.value.docs
            .map(doc => {
              const data = doc.data()
              return {
                id: doc.id,
                ...data,
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : 
                           data.createdAt ? new Date(data.createdAt) : 
                           data.updatedAt?.toDate ? data.updatedAt.toDate() :
                           new Date()
              }
            })
            .filter(article => article.published !== false)
            .sort((a, b) => b.createdAt - a.createdAt)
          
          setArticles(articlesList)
          console.log('Fetched articles:', articlesList.length)
        } else {
          console.error('Error fetching articles:', articlesSnapshot.reason)
          setArticles([])
        }

        // कविताहरू process गर्ने - date format गरेर र category set गरेर
        if (poemsSnapshot.status === 'fulfilled') {
          const poemsList = poemsSnapshot.value.docs
            .map(doc => {
              const data = doc.data()
              return {
                id: doc.id,
                ...data,
                type: 'poem',
                category: 'कविता',
                createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : 
                           data.createdAt ? new Date(data.createdAt) : 
                           data.updatedAt?.toDate ? data.updatedAt.toDate() :
                           new Date()
              }
            })
            .sort((a, b) => b.createdAt - a.createdAt)
          
          setPoems(poemsList)
          console.log('Fetched poems:', poemsList.length)
        } else {
          console.error('Error fetching poems:', poemsSnapshot.reason)
          setPoems([])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setArticles([])
        setPoems([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const categories = ['सबै', 'कविता', 'आलोचना', 'समीक्षा', 'निबन्ध', 'अन्य']
  const [selectedCategory, setSelectedCategory] = useState('सबै')

  // लेख र कविताहरू जोडेर display गर्नको लागि तयार गर्ने
  const allContent = [
    ...articles.map(a => ({ ...a, type: 'article' })),
    ...poems.map(p => ({ ...p, type: 'poem' }))
  ].sort((a, b) => b.createdAt - a.createdAt)

  const filteredContent = selectedCategory === 'सबै'
    ? allContent
    : selectedCategory === 'कविता'
    ? poems.map(p => ({ ...p, type: 'poem' }))
    : articles.filter(article => article.category === selectedCategory).map(a => ({ ...a, type: 'article' }))

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">✍️</div>
          <p className="text-xl text-parchment-700 font-devanagari">लोड हुँदैछ...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header Section - पृष्ठको मुख्य शीर्षक */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src={headerImage}
              alt="Lekhan-Shilpa Heading"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl mb-6 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <h1 className="section-title mb-6 font-devanagari">लेखन</h1>
          <p className="section-subtitle font-devanagari">
          सिर्जना, समालोचना र साहित्यिक कर्मको  ब्लग लेआउट
          </p>
          <div className="sanskrit-divider"></div>
        </div>

        {/* Category Filter - श्रेणी अनुसार filter गर्ने buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold font-devanagari transition-all text-sm sm:text-base min-h-[44px] ${
                selectedCategory === category
                  ? 'bg-saffron-500 text-white shadow-lg'
                  : 'bg-white text-parchment-700 hover:bg-parchment-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Content Grid - Notebook Style मा लेख र कविताहरू display गर्ने grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredContent.map((item) => (
            <div
              key={item.id}
              className="notebook-card group"
              onClick={() => {
                if (item.type === 'poem') {
                  setSelectedPoem(item)
                } else {
                  setSelectedArticle(item)
                }
              }}
            >
              {item.imageUrl && (
                <div className="mb-4 -mx-2 -mt-2">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-40 object-contain bg-parchment-50 rounded-t"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
              )}
              <div className="mb-3 flex items-center gap-2">
                <span className="text-2xl">{item.type === 'poem' ? '📜' : '✍️'}</span>
                <span className="notebook-category">
                  {item.category || (item.type === 'poem' ? 'कविता' : 'अन्य')}
                </span>
                {item.type === 'poem' && item.audioUrl && (
                  <span className="text-xs text-saffron-600 font-devanagari">🎵 ऑडियो</span>
                )}
              </div>
              <h3 className="notebook-title text-xl mb-3 group-hover:text-saffron-600 transition-colors line-clamp-2">
                {item.title}
              </h3>
              {item.excerpt && (
                <p className="notebook-excerpt text-sm line-clamp-3">
                  {item.excerpt}
                </p>
              )}
              {item.createdAt && (
                <div className="notebook-meta text-xs mt-3 pt-2">
                  <span>
                    {item.createdAt.toDate ? item.createdAt.toDate().toLocaleDateString('ne-NP') : new Date(item.createdAt).toLocaleDateString('ne-NP')}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-16 card">
            <p className="text-xl text-parchment-600 font-devanagari mb-4">
              यस श्रेणीमा कुनै सामग्री भेटिएन
            </p>
            <p className="text-parchment-500 font-devanagari">
              नयाँ लेख वा कविताहरू जल्दै प्रकाशित हुनेछन्
            </p>
          </div>
        )}

        {/* Selected Poem Detail Modal - कविता click गर्दा full view देखाउने modal */}
        {selectedPoem && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedPoem(null)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSelectedPoem(null)
              }
            }}
            tabIndex={-1}
          >
            <div 
              className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-br from-parchment-50 to-white border-b-2 border-saffron-200 p-6 flex justify-between items-start">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="text-2xl">📜</span>
                    <span className="notebook-category text-sm">
                      कविता
                    </span>
                    {selectedPoem.audioUrl && (
                      <span className="text-xs text-saffron-600 font-devanagari">🎵 ऑडियो</span>
                    )}
                  </div>
                  <h2 className="notebook-title text-3xl mb-0 pb-0 border-0">
                    {selectedPoem.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedPoem(null)}
                  className="text-3xl text-parchment-600 hover:text-saffron-600 transition-colors ml-4 flex-shrink-0"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Audio Player - कविताको ऑडियो बजाउने player */}
                {selectedPoem.audioUrl && (
                  <div className="mb-6">
                    <AudioPlayer audioUrl={selectedPoem.audioUrl} title="ऑडियो सुन्नुहोस्" />
                  </div>
                )}

                {/* Poem Content - Notebook Style मा कविता देखाउने */}
                <div className="notebook-page">
                  <div className="notebook-content text-base whitespace-pre-line">
                    {selectedPoem.content || selectedPoem.poem || selectedPoem.excerpt}
                  </div>
                </div>

                {selectedPoem.author && (
                  <p className="text-parchment-600 font-devanagari italic">
                    — {selectedPoem.author}
                  </p>
                )}

                {/* Like Button */}
                <div className="flex items-center justify-between pt-4 border-t border-parchment-200">
                  <LikeButton contentId={selectedPoem.id} contentType="poem" />
                  {selectedPoem.createdAt && (
                    <p className="text-sm text-parchment-600 font-devanagari">
                      {selectedPoem.createdAt.toDate ? selectedPoem.createdAt.toDate().toLocaleDateString('ne-NP') : new Date(selectedPoem.createdAt).toLocaleDateString('ne-NP')}
                    </p>
                  )}
                </div>

                {/* Comments Section - कवितामा टिप्पणीहरू देखाउने र थप्ने section */}
                <CommentsSection contentId={selectedPoem.id} contentType="poem" />
              </div>
            </div>
          </div>
        )}

        {/* Selected Article Detail Modal - लेख click गर्दा full view देखाउने modal */}
        {selectedArticle && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedArticle(null)
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setSelectedArticle(null)
              }
            }}
            tabIndex={-1}
          >
            <div 
              className="bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gradient-to-br from-parchment-50 to-white border-b-2 border-saffron-200 p-4 sm:p-6 flex justify-between items-start z-10">
                <div className="flex-1 pr-2 sm:pr-4">
                  <div className="mb-2 sm:mb-3">
                    <span className="notebook-category text-xs sm:text-sm">
                      {selectedArticle.category || 'अन्य'}
                    </span>
                  </div>
                  <h2 className="notebook-title text-xl sm:text-2xl md:text-3xl mb-0 pb-0 border-0 text-left sm:text-center">
                    {selectedArticle.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-2xl sm:text-3xl text-parchment-600 hover:text-saffron-600 transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {selectedArticle.imageUrl && (
                  <div className="mb-6">
                    <img
                      src={selectedArticle.imageUrl}
                      alt={selectedArticle.title}
                      className="w-full max-h-96 object-contain rounded-lg bg-parchment-50 mx-auto"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}

                {/* Article Content - Notebook Style मा लेख देखाउने */}
                <div className="notebook-page">
                  <div className="notebook-content text-base whitespace-pre-line">
                    {selectedArticle.content || selectedArticle.body || selectedArticle.excerpt}
                  </div>
                </div>

                {selectedArticle.author && (
                  <p className="text-parchment-600 font-devanagari italic">
                    — {selectedArticle.author}
                  </p>
                )}

                {/* Like Button */}
                <div className="flex items-center justify-between pt-4 border-t border-parchment-200">
                  <LikeButton contentId={selectedArticle.id} contentType="article" />
                  {selectedArticle.createdAt && (
                    <p className="text-sm text-parchment-600 font-devanagari">
                      {selectedArticle.createdAt.toDate ? selectedArticle.createdAt.toDate().toLocaleDateString('ne-NP') : new Date(selectedArticle.createdAt).toLocaleDateString('ne-NP')}
                    </p>
                  )}
                </div>

                {/* Comments Section */}
                <CommentsSection contentId={selectedArticle.id} contentType="article" />
              </div>
            </div>
          </div>
        )}

        {/* Introduction */}
        <div className="mt-16 card bg-gradient-to-br from-saffron-50 to-sandalwood-50 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-1/3 h-full opacity-10">
            <img
              src={backgroundImage}
              alt="Background"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div className="text-center relative z-10">
            <h3 className="text-2xl font-bold text-saffron-700 mb-4 font-devanagari">
              लेखनका  बारेमा
            </h3>
            <p className="text-parchment-700 font-devanagari leading-relaxed text-lg mb-4">
              <strong className="text-saffron-700">डा. देवी नेपाल प्रथमतः कवि हुन् । </strong> 
              यस  खण्डमा डा. देवी नेपालका कविता, गीत, गजल, निबन्ध, समालोचना तथा साहित्यिक लेख रचनाहरू समावेश गरिएका छन्
              ।
            </p>
            '<p className="text-parchment-600 font-devanagari">'
            
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LekhanShilpa
