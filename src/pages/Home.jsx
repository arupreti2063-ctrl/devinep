import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore'
import { db } from '../config/firebase'
import LikeButton from '../components/LikeButton'
import CommentsSection from '../components/CommentsSection'
import AudioPlayer from '../components/AudioPlayer'
import { getHeroImage, getGalleryImages } from '../utils/heroImages'
// Images import गर्ने - deployment को लागि src folder मा राखिएको
import headerImage from '../assets/images/image.png'
import backgroundImage from '../assets/images/image-copy.png'
import profileImage from '../assets/images/pic.png'

const Home = () => {
  const location = useLocation()
  const heroImage = getHeroImage(location.pathname)
  const galleryImages = getGalleryImages()
  const [recentPosts, setRecentPosts] = useState([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [selectedPost, setSelectedPost] = useState(null)

  // ESC key दबाउँदा modal बन्द गर्ने function
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        setSelectedPost(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  useEffect(() => {
    const fetchRecentPosts = async () => {
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
              console.log('OrderBy failed for articles, fetching all:', orderError)
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

        // लेखहरू process गर्ने - date format गरेर र type set गरेर
        const articlesList = []
        if (articlesSnapshot.status === 'fulfilled') {
          articlesSnapshot.value.docs.forEach(doc => {
            const data = doc.data()
            articlesList.push({
              id: doc.id,
              ...data,
              type: 'article',
              category: data.category || 'लेख',
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : 
                         data.createdAt ? new Date(data.createdAt) : 
                         data.updatedAt?.toDate ? data.updatedAt.toDate() :
                         new Date()
            })
          })
        } else {
          console.error('Error fetching articles:', articlesSnapshot.reason)
        }

        // कविताहरू process गर्ने - date format गरेर र type/category set गरेर
        const poemsList = []
        if (poemsSnapshot.status === 'fulfilled') {
          poemsSnapshot.value.docs.forEach(doc => {
            const data = doc.data()
            poemsList.push({
              id: doc.id,
              ...data,
              type: 'poem',
              category: 'कविता',
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : 
                         data.createdAt ? new Date(data.createdAt) : 
                         data.updatedAt?.toDate ? data.updatedAt.toDate() :
                         new Date()
            })
          })
        } else {
          console.error('Error fetching poems:', poemsSnapshot.reason)
        }

        // सबै posts जोडेर filter गर्ने - published मात्र देखाउने
        const allPosts = [...articlesList, ...poemsList]
          .filter(post => {
            // published posts मात्र देखाउने (default true, false भएको मात्र hide गर्ने)
            return post.published !== false
          })
          .sort((a, b) => {
            // मिति अनुसार descending order मा sort गर्ने (नयाँ पहिले)
            return b.createdAt - a.createdAt
          })
          .slice(0, 10) // अन्तिम १० वटा मात्र देखाउने
        
        // Posts list set गर्ने (real-time data मात्र, empty भए पनि)
        setRecentPosts(allPosts)
        console.log(`Fetched ${allPosts.length} recent posts (${articlesList.length} articles + ${poemsList.length} poems, showing up to 10)`)
      } catch (error) {
        console.error('Error fetching posts:', error)
        // Set empty array on error - no fallback/static data
        setRecentPosts([])
      } finally {
        setLoadingPosts(false)
      }
    }

    // Fetch immediately
    fetchRecentPosts()
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section - मुख्य landing section, डा. नेपालको portrait र introduction */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-saffron-100 via-sandalwood-50 to-parchment-100 opacity-90"></div>
        <div className="absolute inset-0 mandala-bg opacity-40"></div>
        {/* Hero Heading Image - background मा dynamic decorative image */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 sm:opacity-20">
          <img
            src={heroImage}
            alt="Header Image"
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback to default header image
              e.target.src = headerImage
              e.target.onerror = () => {
                e.target.style.display = 'none'
              }
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content - मुख्य text content (शीर्षक, description, buttons) */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <div className="mb-4 sm:mb-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-saffron-700 mb-4 sm:mb-6 font-devanagari leading-tight">
                  प्रा. डा. देवी नेपाल
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl text-sandalwood-700 font-devanagari mb-3 sm:mb-4">
                कवि, समालोचक, साहित्यकार 
                </p>
              </div>
              
              <p className="text-base sm:text-lg md:text-xl text-parchment-700 mb-6 sm:mb-8 font-devanagari leading-relaxed px-2 sm:px-0">
              सिर्जना, समालोचना, अनुसन्धान, प्रशिक्षण तथा शास्त्रीय छन्दको पुनर्जागरणमा रुचि 
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link to="/chhanda-gyan" className="btn btn-primary font-devanagari text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  छन्द-ज्ञान
                </Link>
                <Link to="/about" className="btn btn-secondary font-devanagari text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                  बारेमा जान्नुहोस्
                </Link>
              </div>
            </div>

            {/* Right: Image/Portrait - डा. नेपालको portrait image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2 mb-6 lg:mb-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-saffron-300 to-sandalwood-400 blur-2xl sm:blur-3xl opacity-20 sm:opacity-30 transform scale-125 sm:scale-150"></div>
                <img
                  src={profileImage}
                  alt="डा. देवी नेपाल"
                  className="relative w-48 sm:w-64 md:w-72 lg:w-80 h-auto object-contain mx-auto"
                  loading="eager"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - तल scroll गर्ने indicator arrow */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Sections - मुख्य sections (छन्द-ज्ञान, लेखन-शिल्प, प्राज्ञ विचार) */}
      <section className="py-20 relative">
        {/* Background Image - decorative background image */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <img
            src={backgroundImage}
            alt="Background"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <img
              src={headerImage}
              alt="Main Heading"
              className="w-full max-w-4xl mx-auto mb-6 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
            <h2 className="section-title font-devanagari">मुख्य विषयहरू</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Chhanda-Gyan Section - छन्द-ज्ञान section को card */}
            <Link to="/chhanda-gyan" className="group cursor-pointer py-4 sm:py-6">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">📜</div>
                <h3 className="text-xl sm:text-2xl font-bold text-saffron-700 mb-2 sm:mb-3 font-devanagari">छन्द-ज्ञान</h3>
                <p className="text-sm sm:text-base text-parchment-700 font-devanagari px-2 sm:px-0">
                <p className="text-sm sm:text-base text-parchment-700 font-devanagari px-2 sm:px-0">
                छन्दको सिद्धान्त र प्रयोगसम्बन्धी  सामग्रीहरूको ब्लग लेआउट
                </p>
                </p>
              </div>
            </Link>

            {/* Lekhan-Shilpa Section - लेखन-शिल्प section को card */}
            <Link to="/lekhan-shilpa" className="group cursor-pointer py-4 sm:py-6">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">✍️</div>
                <h3 className="text-xl sm:text-2xl font-bold text-saffron-700 mb-2 sm:mb-3 font-devanagari">लेखन</h3>
                <p className="text-sm sm:text-base text-parchment-700 font-devanagari px-2 sm:px-0">
                सिर्जना, समालोचना र साहित्यिक कर्मको  ब्लग लेआउट
                </p>
              </div>
            </Link>

            {/* Vigya-Vichar Section - प्राज्ञ विचार section को card */}
            <Link to="/vigya-vichar" className="group cursor-pointer py-4 sm:py-6 sm:col-span-2 md:col-span-1">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform">🌺</div>
                <h3 className="text-xl sm:text-2xl font-bold text-saffron-700 mb-2 sm:mb-3 font-devanagari">प्राज्ञिक विचार</h3>
                <p className="text-sm sm:text-base text-parchment-700 font-devanagari px-2 sm:px-0">
                  पूर्वी दार्शनिक दृष्टिकोणहरू प्रस्तुत गर्ने ल्यान्डिङ पृष्ठ
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Image Gallery Section - Attractive Gallery with devinepalpic images */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-parchment-50 via-saffron-50/30 to-sandalwood-50/30">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="section-title mb-4 font-devanagari">ग्यालेरी</h2>
            <p className="section-subtitle font-devanagari">
              डा. देवी नेपालका विभिन्न क्षणहरू
            </p>
            <div className="sanskrit-divider mx-auto"></div>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {galleryImages.map((imageSrc, index) => (
                <div 
                  key={index} 
                  className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div className="aspect-square bg-gradient-to-br from-saffron-100 to-sandalwood-100">
                    <img
                      src={imageSrc}
                      alt={`डा. देवी नेपाल - ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-sm font-devanagari font-semibold">डा. देवी नेपाल</p>
                    </div>
                  </div>
                  {/* Decorative corner element */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-saffron-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section - लेखन-शिल्प र छन्द-ज्ञानबाट अन्तिम १० posts देखाउने */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="section-title mb-3 sm:mb-4 font-devanagari">हालैका लेखहरू</h2>
            <p className="section-subtitle font-devanagari px-2 sm:px-0">
              लेखन-शिल्प र छन्द-ज्ञानबाट नयाँ प्रकाशनहरू (अन्तिम १० पोस्टहरू)
            </p>
          </div>

          {loadingPosts ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-4 animate-spin"></div>
              <p className="text-parchment-600 font-devanagari">लोड हुँदैछ...</p>
            </div>
          ) : recentPosts.length > 0 ? (
            <div className="max-w-5xl mx-auto space-y-6">
              {recentPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="notebook-page cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => setSelectedPost(post)}
                >
                  {post.imageUrl && (
                    <div className="mb-4 -mx-3 -mt-2.5">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-64 object-contain bg-parchment-50 rounded"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="mb-4 flex items-center gap-2">
                    <span className="text-xl">{post.type === 'poem' ? '📜' : '✍️'}</span>
                    <span className="notebook-category">
                      {post.category || (post.type === 'poem' ? 'कविता' : 'लेख')}
                    </span>
                    {post.type === 'poem' && post.audioUrl && (
                      <span className="text-xs text-saffron-600 font-devanagari">🎵 ऑडियो</span>
                    )}
                  </div>
                  
                  <h3 className="notebook-title text-2xl mb-4 hover:text-saffron-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  {post.excerpt && (
                    <div className="notebook-excerpt mb-4">
                      {post.excerpt}
                    </div>
                  )}
                  
                  <div className="notebook-meta flex justify-between items-center">
                    {post.createdAt && (
                      <span>
                        {post.createdAt.toDate ? post.createdAt.toDate().toLocaleDateString('ne-NP') : new Date(post.createdAt).toLocaleDateString('ne-NP')}
                      </span>
                    )}
                    <button
                      className="text-saffron-600 hover:text-saffron-700 font-semibold font-devanagari transition-colors"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedPost(post)
                      }}
                    >
                      पूरा पढ्नुहोस् →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-parchment-600 font-devanagari text-lg">
                अहिले कुनै लेख उपलब्ध छैन। 
              </p>
              <p className="text-parchment-500 font-devanagari mt-2">
               
              </p>
            </div>
          )}

          {recentPosts.length > 0 && (
            <div className="text-center mt-12">
              <Link to="/lekhan-shilpa" className="btn btn-primary font-devanagari text-lg">
                सबै लेखहरू हेर्नुहोस्
              </Link>
            </div>
          )}

          {/* Selected Post Detail Modal - post click गर्दा full view देखाउने modal */}
          {selectedPost && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-2 sm:p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setSelectedPost(null)
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSelectedPost(null)
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
                        {selectedPost.category || 'अन्य'}
                      </span>
                    </div>
                    <h2 className="notebook-title text-xl sm:text-2xl md:text-3xl mb-0 pb-0 border-0 text-left sm:text-center">
                      {selectedPost.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-2xl sm:text-3xl text-parchment-600 hover:text-saffron-600 transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Audio Player - कविताको ऑडियो बजाउने player */}
                  {selectedPost.type === 'poem' && selectedPost.audioUrl && (
                    <div className="mb-6">
                      <AudioPlayer audioUrl={selectedPost.audioUrl} title="ऑडियो सुन्नुहोस्" />
                    </div>
                  )}

                  {selectedPost.imageUrl && (
                    <div className="mb-6">
                      <img
                        src={selectedPost.imageUrl}
                        alt={selectedPost.title}
                        className="w-full max-h-96 object-contain rounded-lg bg-parchment-50 mx-auto"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    </div>
                  )}

                  {/* Post Content - Notebook Style मा post content देखाउने */}
                  <div className="notebook-page">
                    <div className="notebook-content text-base whitespace-pre-line">
                      {selectedPost.content || selectedPost.poem || selectedPost.body || selectedPost.excerpt}
                    </div>
                  </div>

                  {selectedPost.author && (
                    <p className="text-parchment-600 font-devanagari italic">
                      — {selectedPost.author}
                    </p>
                  )}

                  {/* Like Button - post लाई like गर्ने button */}
                  <div className="flex items-center justify-between pt-4 border-t border-parchment-200">
                    <LikeButton 
                      contentId={selectedPost.id} 
                      contentType={selectedPost.type === 'poem' ? 'poem' : 'article'} 
                    />
                    {selectedPost.createdAt && (
                      <p className="text-sm text-parchment-600 font-devanagari">
                        {selectedPost.createdAt.toDate ? selectedPost.createdAt.toDate().toLocaleDateString('ne-NP') : new Date(selectedPost.createdAt).toLocaleDateString('ne-NP')}
                      </p>
                    )}
                  </div>

                  {/* Comments Section - post मा टिप्पणीहरू देखाउने र थप्ने section */}
                  <CommentsSection 
                    contentId={selectedPost.id} 
                    contentType={selectedPost.type === 'poem' ? 'poem' : 'article'} 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Philosophy Preview Section - दार्शनिक दृष्टिकोणको preview section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-parchment-50 to-sandalwood-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="section-title mb-4 sm:mb-6 font-devanagari">दार्शनिक दृष्टिकोण</h2>
            <p className="text-lg sm:text-xl text-parchment-700 mb-6 sm:mb-8 font-devanagari leading-relaxed px-2 sm:px-0">
              "प्रगतिशील नेपाली वर्णनात्मक कवितामा द्वन्द्वात्मकता" - यस शोधका माध्यमबाट 
              डा. नेपालले पूर्वी दर्शन र आधुनिक साहित्यिक चिन्तनबीचको सेतु निर्माण गरेका  छन्।
            </p>
            <Link to="/vigya-vichar" className="btn btn-primary font-devanagari text-base sm:text-lg">
              थप पढ्नुहोस्
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
