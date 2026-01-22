import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
import { getHeroImage, getGalleryImages } from '../utils/heroImages'
// Images import गर्ने - deployment को लागि src folder मा राखिएको
import headerImage from '../assets/images/image.png'
import backgroundImage from '../assets/images/image-copy.png'

const Works = () => {
  const location = useLocation()
  const heroImage = getHeroImage(location.pathname)
  const galleryImages = getGalleryImages()
  
  // Function to get book cover image path based on title
  const getBookCoverImage = (title) => {
    const titleToImageMap = {
      'श्रद्धाञ्जली': null,
      'छन्दको सुगन्ध': null,
      'छन्द–पराग': 'xanda parag.jpeg',
      'त्रिशतक': 'trishakta.jpeg',
      'तितामिठा कुरा': null,
      'साहित्य सन्ध्या र पुरस्कृत प्रतिभाहरू': 'sahitya sandhya .jpeg',
      'कुखुराको बिहे': 'kukhurako bihe.jpeg',
      'गजल कसरी लेख्ने ?': 'gajal kasari lekhne .jpeg',
      'माटो र मुटु': 'mato ra mutu.jpeg',
      'काव्य समालोचना': 'kabya samalochana.jpeg',
      'समयरेखा': 'samaya rekha.jpeg',
      'निबन्ध मुना': null,
      'निबन्ध कोपिला': null,
      'सलादजस्तो देश': 'salad jasto desh.jpeg',
      'भानु भन्दै हिँडी रहूँ': 'vanu vandai hidi rahu.jpeg',
      'मैना चरी दङ्ग परी': 'maina chari danga pari.jpeg',
      'छन्द–तरङ्ग': null,
      'नाना देऊ पुतली': 'nanadeuputali.jpeg',
      'अआ पढ्ने बेला': 'padne bela.jpeg',
      'को छ हँ ?': 'ko ho ha.jpeg',
      'गन्दै गन्दै जान्छु': 'gandai gandai janxu.jpeg',
      'आरोहण': 'aarohan.jpeg',
      'क ख ग घ पढ न': null,
      'पागल': 'khandakabya trayodasha.jpeg',
      'मामाघरको रोपाइँ': null,
      'समुद्रमन्थन': 'samundramanthan.jpeg',
      ' सम्यक् दृष्टि': 'samyak dristi.jpeg',
      ' कृति र प्रवृत्ति': 'kriti ra prawitti.jpeg',
      ' पहिलो पाठक': 'pahilo pathak.jpeg',
      '  युगकवि सिद्धिचरणका कवितामा छन्दविधान': 'yugcharan xanda kabita ma dwanda bidhan.jpeg',
      '  नेपाली खण्डकाव्यको इतिहास (जगदम्बा नेपाली साहित्यको बृहत् इतिहास, भाग-४) ': null,
      'लेखन शिल्प': 'lekhan silpa.jpeg',
    }
    
    // Try exact match first
    if (titleToImageMap[title]) {
      const imagePath = titleToImageMap[title]
      if (imagePath) {
        // Public folder paths - spaces will be handled by browser automatically
        return `/images of the cover/Camera Roll/${imagePath}`
      }
      return null
    }
    
    // Try trimmed match
    const trimmedTitle = title.trim()
    if (titleToImageMap[trimmedTitle]) {
      const imagePath = titleToImageMap[trimmedTitle]
      if (imagePath) {
        return `/images of the cover/Camera Roll/${imagePath}`
      }
      return null
    }
    
    return null
  }

  // Published Works - Historical publications
  const publishedWorks = [
    { title: 'श्रद्धाञ्जली', subtitle: 'खण्डकाव्य', year: '२०५७', category: 'काव्य' },
    { title: 'छन्दको सुगन्ध', subtitle: 'कविता क्यासेट', year: '२०६०', category: 'छन्द' },
    { title: 'छन्द–पराग', subtitle: 'छन्दको लक्षणशास्त्र', year: '२०६२', category: 'छन्द' },
    { title: 'त्रिशतक', subtitle: 'मुक्तकाव्य', year: '२०६३', category: 'काव्य' },
    { title: 'तितामिठा कुरा', subtitle: 'नीतिसङ्ग्रह, सहलेखन', year: '२०६३', category: 'कविता' },
    { title: 'साहित्य सन्ध्या र पुरस्कृत प्रतिभाहरू', subtitle: '', year: '२०६४', category: 'समालोचना' },
    { title: 'कुखुराको बिहे', subtitle: 'बालकाव्य', year: '२०६५', category: 'बाल साहित्य' },
    { title: 'गजल कसरी लेख्ने ?', subtitle: 'गजल सिकाइ', year: '२०६६', category: 'लेखन' },
    { title: 'माटो र मुटु', subtitle: 'कवितासङ्ग्रह', year: '२०६७', category: 'कविता' },
    { title: 'काव्य समालोचना', subtitle: 'समालोचना', year: '२०६८', category: 'समालोचना' },
    { title: 'समयरेखा', subtitle: 'समालोचना', year: '२०६८', category: 'समालोचना' },
    { title: 'निबन्ध मुना', subtitle: 'बाल निबन्धसङ्ग्रह', year: '२०७०', category: 'बालसाहित्य' },
    { title: 'निबन्ध कोपिला', subtitle: 'बाल निबन्धसङ्ग्रह', year: '२०७१', category: 'बालसाहित्य' },
    { title: 'सलादजस्तो देश', subtitle: 'कवितासङ्ग्रह', year: '२०७१', category: 'कविता' },
    { title: 'भानु भन्दै हिँडी रहूँ', subtitle: 'यात्राकाव्य', year: '२०७२', category: 'काव्य ' },
    { title: 'मैना चरी दङ्ग परी', subtitle: 'बालकाव्य', year: '२०७२', category: 'बालसाहित्य' },
    { title: 'छन्द–तरङ्ग', subtitle: 'छन्दको एकल सिडी', year: '२०७३', category: 'छन्द' },
    { title: 'छन्द–पराग', subtitle: 'परिमार्जित संस्करण', year: '२०७३', category: 'छन्द' },
    { title: 'नाना देऊ पुतली', subtitle: 'बाल कवितासङ्ग्रह', year: '२०७४', category: 'बालसाहित्य' },
    { title: 'अआ पढ्ने बेला', subtitle: 'बाल कवितासङ्ग्रह', year: '२०७४', category: 'बालसाहित्य' },
    { title: 'को छ हँ ?', subtitle: 'बाल कवितासङ्ग्रह', year: '२०७४', category: 'बालसाहित्य' },
    { title: 'गन्दै गन्दै जान्छु', subtitle: 'बाल कवितासङ्ग्रह', year: '२०७४', category: 'बालसाहित्य' },
    { title: 'आरोहण', subtitle: 'संयुक्त महाकाव्य', year: '२०७४', category: 'काव्य ' },
    { title: 'क ख ग घ पढ न', subtitle: 'बाल कवितासङ्ग्रह', year: '२०७६', category: 'बालसाहित्य' },
    { title: 'पागल', subtitle: 'खण्डकाव्यत्रयोदशभित्र', year: '२०७७', category: 'काव्य ' },
    { title: 'मामाघरको रोपाइँ', subtitle: 'बालकाव्य', year: '२०७७', category: 'बालसाहित्य' },
    { title: 'समुद्रमन्थन', subtitle: 'खण्डकाव्य', year: '२०७७', category: 'काव्य ' },
    { title: ' सम्यक् दृष्टि', subtitle: 'समालोचना', year: '२०७८', category: 'समालोचना' },
    { title: ' कृति र प्रवृत्ति', subtitle: 'समालोचना', year: '२०७८', category: 'समालोचना' },
    { title: ' पहिलो पाठक', subtitle: 'समालोचना', year: '२०७८', category: 'समालोचना' },
    { title: '  युगकवि सिद्धिचरणका कवितामा छन्दविधान', subtitle: 'समालोचना', year: ' २०७९ ', category: 'समालोचना' },
    { title: '  नेपाली खण्डकाव्यको इतिहास (जगदम्बा नेपाली साहित्यको बृहत् इतिहास, भाग-४) ', subtitle: 'इतिहास', year: ' २०७९ ', category: 'इतिहास' },
  ]

  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch from Firebase - Real-time data only (no static/fallback data)
    const fetchWorks = async () => {
      try {
        const worksRef = collection(db, 'externalList')
        
        let snapshot
        try {
          const q = query(worksRef, orderBy('createdAt', 'desc'))
          snapshot = await getDocs(q)
        } catch (orderError) {
          console.log('OrderBy failed, fetching all works:', orderError)
          snapshot = await getDocs(worksRef)
        }
        
        const worksList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        // Always set the works list, even if empty (real-time)
        setWorks(worksList)
        console.log('Fetched works:', worksList.length)
      } catch (error) {
        console.error('Error fetching works:', error)
        // Set empty array on error - no fallback data
        setWorks([])
      } finally {
        setLoading(false)
      }
    }

    // Fetch from Firebase
    fetchWorks()
  }, [])

  const categories = ['सबै', 'छन्द', 'लेखन', 'कविता', 'बाल साहित्य', 'समालोचना', 'निबन्ध', 'अन्य']
  const [selectedCategory, setSelectedCategory] = useState('सबै')

  // Combine published works with Firebase works
  const allWorks = [
    ...publishedWorks.map((work, index) => ({
      id: `published-${index}`,
      title: work.title,
      subtitle: work.subtitle,
      year: work.year,
      category: work.category,
      isPublished: true
    })),
    ...works.map(work => ({
      ...work,
      isPublished: false
    }))
  ]

  const filteredWorks = (selectedCategory === 'सबै' 
    ? allWorks 
    : allWorks.filter(work => work.category === selectedCategory)
  ).sort((a, b) => {
    // Sort: books with cover images first, then books without
    const aHasCover = getBookCoverImage(a.title) !== null
    const bHasCover = getBookCoverImage(b.title) !== null
    
    if (aHasCover && !bHasCover) return -1  // a comes first
    if (!aHasCover && bHasCover) return 1   // b comes first
    return 0  // keep original order for same type
  })

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

  // Image paths - using utility function for additional info section
  const [deviNepalPic1, deviNepalPic2, deviNepalPic3, deviNepalPic4] = galleryImages

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero Header Section with Dynamic Hero Image */}
        <div className="text-center mb-16 relative">
          {/* Dynamic Hero Picture as Hero Background */}
          <div className="relative mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-b from-saffron-900/80 via-saffron-700/70 to-sandalwood-800/80 z-10"></div>
            <img
              src={heroImage}
              alt="डा. देवी नेपाल"
              className="w-full h-[400px] sm:h-[500px] object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
                const overlay = e.target.parentElement.querySelector('.gradient-overlay')
                if (overlay) overlay.style.display = 'block'
              }}
            />
            <div className="gradient-overlay absolute inset-0 bg-gradient-to-br from-saffron-500 to-sandalwood-400 hidden"></div>
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
              <h1 className="section-title mb-4 font-devanagari text-white drop-shadow-2xl">प्रमुख कृतिहरू</h1>
              <p className="text-xl sm:text-2xl font-devanagari mb-2 drop-shadow-lg">३० भन्दा बढी प्रकाशित कार्यहरू</p>
              <div className="w-32 h-1 bg-white rounded-full mt-4"></div>
            </div>
          </div>
          
          {/* Fallback header if main image doesn't load */}
          <div className="mb-8 hidden">
            <img
              src={headerImage}
              alt="Works Heading"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl mb-6 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div className="sanskrit-divider"></div>
        </div>

        {/* Category Filter with Decorative Images */}
        <div className="relative mb-8 sm:mb-12">
          {/* Decorative background images */}
          <div className="absolute -left-20 top-0 w-32 h-32 opacity-10 hidden lg:block">
            <img
              src={deviNepalPic1}
              alt=""
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div className="absolute -right-20 top-0 w-32 h-32 opacity-10 hidden lg:block">
            <img
              src={deviNepalPic2}
              alt=""
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 relative z-10">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold font-devanagari transition-all text-sm sm:text-base min-h-[44px] ${
                  selectedCategory === category
                    ? 'bg-saffron-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-parchment-700 hover:bg-parchment-100 hover:shadow-md'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Works Grid with Decorative Elements */}
        <div className="relative">
          {/* Decorative corner images */}
          <div className="absolute -top-10 -left-10 w-24 h-24 opacity-5 hidden xl:block">
            <img
              src={deviNepalPic1}
              alt=""
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div className="absolute -top-10 -right-10 w-24 h-24 opacity-5 hidden xl:block">
            <img
              src={deviNepalPic2}
              alt=""
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {filteredWorks.map((work) => {
            const coverImage = getBookCoverImage(work.title)
            return (
              <div key={work.id} className="card group hover:shadow-xl transition-all flex flex-col">
                {/* Book Cover Image */}
                <div className="mb-4 w-full h-64 overflow-hidden rounded-lg bg-gradient-to-br from-parchment-100 to-parchment-50 flex items-center justify-center border border-parchment-200">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={work.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 p-2"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23f5f5dc"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="14"%3Eकभर छवि%3C/text%3E%3C/svg%3E'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-parchment-400 font-devanagari text-sm">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📚</div>
                        <p>कभर छवि</p>
                        <p>उपलब्ध छैन</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-saffron-100 text-saffron-700 rounded-full text-sm font-semibold font-devanagari">
                    {work.category || 'अन्य'}
                  </span>
                  {work.year && (
                    <span className="text-sm font-bold text-saffron-600 font-devanagari">
                      {work.year}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-saffron-700 mb-2 font-devanagari group-hover:text-saffron-600 transition-colors">
                  {work.title}
                </h3>
                {work.subtitle && (
                  <p className="text-parchment-600 font-devanagari text-sm mb-3 italic">
                    {work.subtitle}
                  </p>
                )}
                {work.description && !work.subtitle && (
                  <p className="text-parchment-700 font-devanagari leading-relaxed mb-3">
                    {work.description}
                  </p>
                )}
                {work.year && (
                  <p className="text-xs text-parchment-500 mt-auto pt-3 border-t border-parchment-200 font-devanagari">
                    प्रकाशन वर्ष: {work.year} (वि.सं.)
                  </p>
                )}
              </div>
            )
          })}
          </div>
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-parchment-600 font-devanagari">
              यस श्रेणीमा कुनै कृति भेटिएन
            </p>
          </div>
        )}

        {/* Additional Info with Images */}
        <div className="mt-16 card bg-gradient-to-br from-saffron-50 to-sandalwood-50 relative overflow-hidden">
          {/* Background Images */}
          <div className="absolute top-0 left-0 w-1/3 h-full opacity-5">
            <img
              src={deviNepalPic1}
              alt="Background"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
            <img
              src={deviNepalPic2}
              alt="Background"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div className="absolute bottom-0 left-1/3 w-1/3 h-full opacity-5">
            <img
              src={backgroundImage}
              alt="Background"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          
          {/* Content with Side Images */}
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Left Image */}
              <div className="hidden md:block">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={deviNepalPic3}
                    alt="डा. देवी नेपाल"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-saffron-900/20 to-transparent"></div>
                </div>
              </div>
              
              {/* Center Content */}
              <div className="text-center md:col-span-1">
                <h3 className="text-2xl font-bold text-saffron-700 mb-4 font-devanagari">
                  अधिक कृतिहरू
                </h3>
                <p className="text-parchment-700 font-devanagari mb-6">
                  डा. देवी नेपालले विभिन्न विषयहरूमा २७ भन्दा बढी कृतिहरू प्रकाशन गरेका छन्। 
                  यसमा छन्द, लेखन, कविता, बाल साहित्य, समालोचना, र निबन्ध समावेश छन्।
                </p>
                <p className="text-parchment-700 font-devanagari mb-4">
                  <strong className="text-saffron-700">मुख्य कार्यहरू:</strong> छन्द-पराग, त्रिशतक, 
                  माटो र मुटु, काव्य समालोचना, समुद्रमन्थन, र धेरै बाल साहित्यिक कृतिहरू।
                </p>
                <p className="text-sm text-parchment-600 font-devanagari">
                  नयाँ प्रकाशनहरूका लागि Admin Dashboard बाट थप्न सकिन्छ।
                </p>
              </div>
              
              {/* Right Image */}
              <div className="hidden md:block">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={deviNepalPic4}
                    alt="डा. देवी नेपाल"
                    className="w-full h-auto object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-saffron-900/20 to-transparent"></div>
                </div>
              </div>
            </div>
            
            {/* Mobile Images */}
            <div className="md:hidden mt-6 grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={deviNepalPic3}
                  alt="डा. देवी नेपाल"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={deviNepalPic4}
                  alt="डा. देवी नेपाल"
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Works
