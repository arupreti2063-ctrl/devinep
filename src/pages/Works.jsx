import React, { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'
// Images import गर्ने - deployment को लागि src folder मा राखिएको
import headerImage from '../assets/images/image.png'
import backgroundImage from '../assets/images/image-copy.png'

const Works = () => {
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

  const filteredWorks = selectedCategory === 'सबै' 
    ? allWorks 
    : allWorks.filter(work => work.category === selectedCategory)

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

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src={headerImage}
              alt="Works Heading"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl mb-6 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <h1 className="section-title mb-6 font-devanagari">प्रमुख कृतिहरू</h1>
          <p className="section-subtitle font-devanagari">३० भन्दा बढी प्रकाशित कार्यहरू</p>
          <div className="sanskrit-divider"></div>
        </div>

        {/* Category Filter */}
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

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work) => (
            <div key={work.id} className="card group hover:shadow-xl transition-all">
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
                <p className="text-xs text-parchment-500 mt-3 pt-3 border-t border-parchment-200 font-devanagari">
                  प्रकाशन वर्ष: {work.year} (वि.सं.)
                </p>
              )}
            </div>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-parchment-600 font-devanagari">
              यस श्रेणीमा कुनै कृति भेटिएन
            </p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 card bg-gradient-to-br from-saffron-50 to-sandalwood-50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/4 h-full opacity-10">
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
        </div>
      </div>
    </div>
  )
}

export default Works
