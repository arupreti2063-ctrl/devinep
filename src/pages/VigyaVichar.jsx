import React from 'react'
// Images import गर्ने - deployment को लागि src folder मा राखिएको
import headerImage from '../assets/images/image.png'
import backgroundImage from '../assets/images/image-copy.png'
import profileImage from '../assets/images/pic.png'

const VigyaVichar = () => {
  const poetryQuotes = [
    {
      quote: "कविता मानव हृदयको ऐना हो",
      translation: "Poetry is the mirror of the human heart",
      source: "कालिदास",
      explanation: "कविताले मानिसको भावना र अनुभूतिलाई प्रतिबिम्बित गर्छ।"
    },
    {
      quote: "कविता मानवताको सङ्गीत हो",
      translation: "Poetry is the music of humanity",
      source: "रवीन्द्रनाथ ठाकुर",
      explanation: "कविताले मानव जीवनको सुन्दरतालाई गीतको रूपमा प्रस्तुत गर्छ।"
    },
    {
      quote: "कविता भावनाहरूको मूर्त रूप हो",
      translation: "Poetry is the concrete form of emotions",
      source: "लक्ष्मीप्रसाद देवकोटा",
      explanation: "कविताले अमूर्त भावनालाई मूर्त शब्दमा बदल्छ।"
    },
    {
      quote: "कविता मनको भाषा हो",
      translation: "Poetry is the language of the soul",
      source: "रूमी",
      explanation: "कविताले मनको गहिराइलाई शब्दहरूमा अभिव्यक्त गर्छ।"
    },
    {
      quote: "छन्दले कवितालाई जीवन दिन्छ",
      translation: "Meter gives life to poetry",
      source: "भानुभक्त आचार्य",
      explanation: "छन्दको प्रयोगले कवितालाई लय र सौन्दर्य प्रदान गर्छ।"
    },
    {
      quote: "कविता सत्यको प्रकाश हो",
      translation: "Poetry is the light of truth",
      source: "तुलसीदास",
      explanation: "कविताले जीवनको सत्यलाई प्रकाशमा ल्याउँछ।"
    },
    {
      quote: "कविता मानिसको सपनाको दुनिया हो",
      translation: "Poetry is the world of human dreams",
      source: "विलियम वर्ड्सवर्थ",
      explanation: "कविताले मानिसका सपना र कल्पनालाई जीवन्त बनाउँछ।"
    },
    {
      quote: "कविताले समाजलाई परिवर्तन गर्छ",
      translation: "Poetry transforms society",
      source: "माधव प्रसाद घिमिरे",
      explanation: "कविताले समाजमा सकारात्मक परिवर्तन ल्याउन सक्छ।"
    },
    {
      quote: "कविता मनको उडान हो",
      translation: "Poetry is the flight of the mind",
      source: "खलील जिब्रान",
      explanation: "कविताले मानिसको मनलाई असीमित उचाइमा उडाउँछ।"
    },
    {
      quote: "कविता अनन्त यात्रा हो",
      translation: "Poetry is an endless journey",
      source: "मिर्ज़ा ग़ालिब",
      explanation: "कविताको यात्रा कहिल्यै अन्त हुँदैन, यो निरन्तर चलिरहन्छ।"
    },
    {
      quote: "कविता जीवनको सार हो",
      translation: "Poetry is the essence of life",
      source: "डा. देवी नेपाल",
      explanation: "कविताले जीवनको मूलभूत सारलाई व्यक्त गर्छ र मानवीय अनुभूतिलाई शाश्वत बनाउँछ।"
    },
    {
      quote: "छन्दको सौन्दर्य अपूर्व छ",
      translation: "The beauty of meter is incomparable",
      source: "डा. देवी नेपाल",
      explanation: "छन्दको प्रयोगले कवितालाई अद्वितीय सौन्दर्य र लय प्रदान गर्छ।"
    }
  ]

  return (
    <div className="min-h-screen py-20 mandala-bg">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src={headerImage}
              alt="Vigya-Vichar Heading"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl mb-6 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
            <div className="mb-4 sm:mb-6">
              <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4">
                <img
                  src={backgroundImage}
                  alt="Section Image"
                  className="h-16 sm:h-24 md:h-32 w-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            <h1 className="section-title mb-6 font-devanagari">प्राज्ञिक विचार</h1>
            <p className="section-subtitle font-devanagari">
               दार्शनिक दृष्टिकोणहरू र डा. देवी नेपालका अभिव्यक्ति 
            </p>
          </div>
          <div className="sanskrit-divider"></div>
        </div>

        {/* Philosophy Introduction */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="card bg-gradient-to-br from-saffron-50 via-sandalwood-50 to-parchment-50 relative overflow-hidden">
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
            <div className="text-center mb-6 sm:mb-8 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-saffron-700 mb-4 sm:mb-6 font-devanagari">
                दार्शनिक दृष्टिकोण
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-parchment-700 font-devanagari leading-relaxed px-2 sm:px-0">
                "प्रगतिवादी नेपाली खण्डकाव्यमा द्वन्द्वविधान" - यस शोधका माध्यमबाट 
                डा. देवी नेपालले पूर्वीय दर्शन र पाश्चात्य चिन्तनलाई द्वन्द्वविधानका माध्यमबाट प्रस्तुत गरेका छन् ।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-saffron-700 mb-3 font-devanagari">
                  पूर्वी दर्शन
                </h3>
               
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-saffron-700 mb-3 font-devanagari">
                  आधुनिक चिन्तन
                </h3>
               
              </div>
            </div>
          </div>
        </div>

        {/* Poetry Quotes Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-saffron-700 text-center mb-12 font-devanagari">
            कवितासम्बन्धी सूक्तिहरू
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {poetryQuotes.map((item, index) => (
              <div key={index} className="card bg-gradient-to-br from-saffron-50 to-sandalwood-50 hover:shadow-2xl transition-all">
                <div className="text-center mb-3 sm:mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2 sm:mb-3">
                    <span className="text-3xl sm:text-4xl">📜</span>
                  </div>
                </div>
                <div className="text-center mb-3 sm:mb-4">
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-saffron-700 mb-2 sm:mb-3 font-devanagari leading-relaxed px-2">
                    "{item.quote}"
                  </p>
                  <p className="text-sm sm:text-base text-sandalwood-700 italic mb-2 sm:mb-3">
                    "{item.translation}"
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-saffron-600 font-devanagari border-t border-saffron-200 pt-2">
                    — {item.source}
                  </p>
                </div>
                <div className="border-t border-saffron-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                  <p className="text-parchment-700 font-devanagari leading-relaxed text-center text-xs sm:text-sm">
                    {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialectics in Poetry */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="card bg-white">
            <h2 className="text-3xl font-bold text-saffron-700 mb-6 text-center font-devanagari">
            प्रगतिवादी नेपाली खण्डकाव्यमा द्वन्द्वविधान
            </h2>
            <div className="space-y-4 text-parchment-700 font-devanagari leading-relaxed text-lg">

              
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default VigyaVichar
