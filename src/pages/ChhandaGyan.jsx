import React, { useState, useEffect } from 'react'
// Images import गर्ने - deployment को लागि src folder मा राखिएको
import headerImage from '../assets/images/image.png'
import backgroundImage from '../assets/images/image-copy.png'

const ChhandaGyan = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">📜</div>
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
              alt="Chhanda-Gyan Heading"
              className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl mb-6 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <h1 className="section-title mb-6 font-devanagari">छन्द-ज्ञान</h1>
          <p className="section-subtitle font-devanagari">
            
          </p>
          <div className="sanskrit-divider"></div>
        </div>



        {/* Comprehensive Chhanda Information - छन्दको विस्तृत जानकारी section */}
        <div className="mt-16 space-y-8">
          {/* Main Introduction Card - मुख्य परिचय card */}
          <div className="card bg-gradient-to-br from-saffron-50 to-sandalwood-50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
              <img
                src={backgroundImage}
                alt="Background"
                className="w-full h-full object-contain"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-saffron-700 mb-6 text-center font-devanagari">
                छन्द शास्त्रीय काव्यको महत्त्वपूर्ण आधार
              </h2>
              
              <div className="space-y-6 text-parchment-700 font-devanagari leading-relaxed text-lg">
                <p>
                  छन्द शास्त्रीय काव्यको महत्त्वपूर्ण आधार हो। यसको प्रयोगले काव्यलाई प्रभावकारी, 
                  स्तरीय र पाठकलाई सहजै स्पर्श गर्ने हुनाले परम्परादेखि नै हाम्रो पूर्वीय साहित्य-काव्यमा 
                  छन्दको महत्त्व प्रमुख रूपमा रही आएको छ। छन्द भनेको कविताको 'लय' हो तापनि परम्परागत 
                  रूपमा छन्दले कविताका सबै किसिमको लयलाई नसमेटेर शास्त्रीय नियमअनुसार गण-मात्राको 
                  व्यवस्था गरी भावना अभिव्यक्त गर्ने कविताको लयलाई मात्र बुझाउँछ।
                </p>
                
                <p>
                  छन्दलाई 'वृत्त' पनि भनिन्छ। छन्दले कवितामा श्रुतिमधुर्य सिर्जना गरी श्रोतालाई सन्तुष्टि 
                  वा आनन्द दिन्छ। अङ्ग्रेजीमा छन्दलाई 'मापक' अर्थात् 'Meter' भनिन्छ भने ल्याटिनमा हलोले 
                  जोतेको कलात्मक सियोतर्फ सङ्केत गर्दै 'हुवर्सस' भनिएको पाइन्छ।
                </p>
                
                <p className="font-semibold text-saffron-800">
                  छन्द वेदको अर्को नाम हो। वर्णहरू र मात्राहरूको गेय व्यवस्थालाई छन्द भनिन्छ। 
                  कल्प, शिक्षा, निरुक्त, छन्द र ज्योतिषशास्त्रलाई वेदको अङ्ग मानिन्छ। पाणिनिको व्याकरणमा 
                  'छन्द: पादौ तु वेदस्य' भनी छन्दलाई वेदको पाउ वा गति, गतिवाहक वस्तु वा तत्त्वका 
                  रूपमा हेरिएको छ।
                </p>
              </div>
            </div>
          </div>

          {/* Definition and Etymology */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="text-2xl font-bold text-saffron-700 mb-4 font-devanagari">
                शब्द व्युत्पत्ति
              </h3>
              <p className="text-parchment-700 font-devanagari leading-relaxed mb-4">
                छन्दस् शब्द 'छद' धातुबाट बनेको छ। यसको धातुगत व्युत्पत्तिमूलक अर्थ हुन्छ - 
                'जो आफ्नो इच्छाले चल्छ'। अत: छन्द शब्दको मूलमा गतिको भाव हुन्छ।
              </p>
              <p className="text-parchment-700 font-devanagari leading-relaxed">
                <strong>परिभाषा:</strong> जब वर्णहरू या मात्राहरूको नियमित संख्याको विन्यासबाट 
                यदि आह्लाद पैदा हुन्छ, तब यस्तोलाई छन्द भनिन्छ।
              </p>
              <p className="text-parchment-600 font-devanagari text-sm mt-4 italic">
                नेपाली बृहत् शब्दकोशमा छन्दलाई "यति, गति र लय मिलेको वर्ण, मात्रा आदिको गणनाअनुसार 
                पद्यात्मक रचना गरिने कुनै निश्चित रूप, त्यसरी गठन हुने विभिन्न किसिमका विशिष्ट वाक्य" 
                भनेर परिभाषित गरिएको छ।
              </p>
            </div>

            <div className="card">
              <h3 className="text-2xl font-bold text-saffron-700 mb-4 font-devanagari">
                इतिहास
              </h3>
              <p className="text-parchment-700 font-devanagari leading-relaxed mb-4">
                छन्दको सर्वप्रथम उल्लेख <strong>ऋग्वेद</strong>मा गरिएको छ। यदि गद्यको नियम 
                व्याकरण हो भने पद्यको नियम <strong>छन्दशास्त्र</strong> हो।
              </p>
              <p className="text-parchment-700 font-devanagari leading-relaxed">
                क्रौञ्च दम्पती (कर्याङकुरुङको जोडी) मध्ये एउटालाई व्याधाले मारेको दृश्यबाट पीडित 
                महर्षि वाल्मीकिका मुखबाट लौकिक संस्कृत पद्यका रुपमा अचानक निस्किएको श्लोकलाई 
                पहिलो पद्य मानिएको छ भने लौकिक संस्कृत साहित्यमा प्रयुक्त प्रथम छन्दको उपमा पनि 
                <strong> अनुष्टुप् छन्द</strong>ले पाएको छ।
              </p>
              <div className="mt-4 p-4 bg-saffron-100 rounded-lg">
                <p className="text-saffron-900 font-devanagari font-semibold italic">
                  "मा निषाद ! प्रतिष्ठात्वमगम: शाश्वती: समा: ।<br/>
                  यत्क्रौञ्चमिथुनादेकमवधी: काममोहितम् ।।"
                </p>
                <p className="text-saffron-700 font-devanagari text-sm mt-2">
                  — वाल्मीकि रामायण, बालकाण्ड, २:१५
                </p>
              </div>
            </div>
          </div>

          {/* Varnika Chhanda - Gana Table - वर्णिक छन्दको गण तालिका */}
          <div className="card">
            <h3 className="text-2xl font-bold text-saffron-700 mb-6 font-devanagari text-center">
              वर्णको परिचय तथा वार्णिक छन्दका नियमहरू (गण)
            </h3>
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full border-collapse border border-parchment-300 text-sm sm:text-base">
                  <thead>
                    <tr className="bg-saffron-200">
                      <th className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-devanagari font-semibold text-xs sm:text-sm">क्रम</th>
                      <th className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-devanagari font-semibold text-xs sm:text-sm">सूत्र</th>
                      <th className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-devanagari font-semibold text-xs sm:text-sm">सङ्केत</th>
                      <th className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-devanagari font-semibold text-xs sm:text-sm">गण</th>
                      <th className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-left font-devanagari font-semibold text-xs sm:text-sm">उदाहरण</th>
                    </tr>
                  </thead>
                  <tbody className="text-parchment-700 font-devanagari">
                  <tr>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">१)</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">यमाता</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">ISS</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">'य'</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">कसैमा, बिहानी, खटाई, पुरानो</td>
                  </tr>
                  <tr className="bg-parchment-50">
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">२)</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">मातारा</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">SSS</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">'म'</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">देखाए, नेपाली, उत्साही</td>
                  </tr>
                  <tr>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">३)</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">ताराज</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">SSI</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">'त'</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">सौन्दर्य, सच्चाइ, उत्थान</td>
                  </tr>
                  <tr className="bg-parchment-50">
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">४)</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">राजभा</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">SIS</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">'र'</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">कल्पना, सम्झना, दृष्टिले</td>
                  </tr>
                  <tr>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">५)</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">जभान</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">ISI</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">'ज'</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">अनेक, बजार, बिहान, लिएर</td>
                  </tr>
                  <tr className="bg-parchment-50">
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">६)</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">भानस</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">SII</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">'भ'</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">मानव, बन्दुक, बञ्चित</td>
                  </tr>
                  <tr>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">७)</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">नसल</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">III</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">'न'</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">कलम, तिलक, रसिक, दमन</td>
                  </tr>
                  <tr className="bg-parchment-50">
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">८)</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">सलगा</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">IIS</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">'स'</td>
                    <td className="border border-parchment-300 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">रसुवा, कविता, अगुवा</td>
                  </tr>
                </tbody>
                </table>
              </div>
              <p className="text-xs text-parchment-600 font-devanagari mt-4 px-4 sm:px-0">
                S = लघु (Short), I = गुरू (Long)
              </p>
            </div>
          </div>

          {/* Chhanda Classification */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card">
              <h3 className="text-xl font-bold text-saffron-700 mb-4 font-devanagari">
                मात्रा र वर्णको आधारमा
              </h3>
              <ul className="space-y-2 text-parchment-700 font-devanagari">
                <li>• <strong>सम:</strong> सबै चरणहरूमा समान</li>
                <li>• <strong>विषम:</strong> चरणहरूमा फरक</li>
                <li>• <strong>अर्धसम:</strong> १/३ र २/४ समान</li>
                <li>• <strong>दंडक:</strong> बहुसंख्यक वर्ण</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-saffron-700 mb-4 font-devanagari">
                स्वतन्त्र/मिश्रित
              </h3>
              <ul className="space-y-2 text-parchment-700 font-devanagari">
                <li>• <strong>स्वतन्त्र:</strong> एकै छन्द नियम</li>
                <li>• <strong>मिश्रित:</strong> २ छन्द मिलाइएको</li>
                <li>• <strong>उदाहरण:</strong> कुंडलिया (दोहा + रोला)</li>
              </ul>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-saffron-700 mb-4 font-devanagari">
                पिङ्गलको आधारमा
              </h3>
              <ul className="space-y-2 text-parchment-700 font-devanagari">
                <li>• <strong>वार्णिक:</strong> वर्ण गणना</li>
                <li>• <strong>मात्रिक:</strong> मात्रा गणना</li>
                <li>• <strong>वर्णमात्रा:</strong> दुवै मिलाएर</li>
              </ul>
            </div>
          </div>

          {/* Chhanda Types List - छन्दका प्रकारहरूको सूची */}
          <div className="card">
            <h3 className="text-2xl font-bold text-saffron-700 mb-6 font-devanagari text-center">
              छन्दको प्रकारहरू (पिङ्गलको आधारमा)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-parchment-700 font-devanagari">
              <div>• अनुष्टुप छन्द</div>
              <div>• विद्युन्माला छन्द</div>
              <div>• इन्द्रवज्रा छन्द</div>
              <div>• उपेन्द्रवज्रा छन्द</div>
              <div>• उपजाति छन्द</div>
              <div>• वंशस्थ छन्द</div>
              <div>• स्रग्विणी छन्द</div>
              <div>• स्वागता छन्द</div>
              <div>• भुजङ्गप्रयात छन्द</div>
              <div>• तोटक छन्द</div>
              <div>• द्रुतविलम्बित छन्द</div>
              <div>• वसन्ततिलका छन्द</div>
              <div>• मालिनी छन्द</div>
              <div>• पञ्चचामर छन्द</div>
              <div>• मन्दाक्रान्ता छन्द</div>
              <div>• चित्रवतीहरिणी छन्द</div>
              <div>• चित्रलेखा छन्द</div>
              <div>• शिखरिणी छन्द</div>
              <div>• शार्दूलविक्रीडित छन्द</div>
              <div>• स्रग्धरा छन्द</div>
              <div>• आर्या छन्द</div>
              <div>• शालिनी छन्द</div>
              <div>• ललिता छन्द</div>
              <div>• पृथ्वी छन्द</div>
              <div>• मञ्जुभाषिणी छन्द</div>
            </div>
          </div>

          {/* Chhanda Anga (Parts) */}
          <div className="card bg-gradient-to-br from-sandalwood-50 to-parchment-50">
            <h3 className="text-2xl font-bold text-saffron-700 mb-6 font-devanagari text-center">
              छन्दको अङ्गहरू
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-parchment-700 font-devanagari">
              <div>
                <p className="mb-2"><strong>चरण:</strong> छन्दको प्रत्येक पंक्तिलाई चरण, पाउ वा पद भनिन्छ।</p>
                <p className="mb-2"><strong>वर्ण:</strong> एकै स्वर हुने ध्वनिलाई वर्ण भनिन्छ।</p>
                <p className="mb-2"><strong>मात्रा:</strong> कुनै वर्णको उच्चारण समयलाई मात्रा भनिन्छ।</p>
                <p><strong>संख्या र क्रम:</strong> वर्ण र मात्राहरूको गणना र स्थान निर्धारण।</p>
              </div>
              <div>
                <p className="mb-2"><strong>गण:</strong> वार्णिक छन्दसँग सम्बन्धित (य, म, त, र, ज, भ, न, स)।</p>
                <p className="mb-2"><strong>गति:</strong> छन्दलाई पढ्दा लिने समयलाई गति भनिन्छ।</p>
                <p className="mb-2"><strong>यति:</strong> छन्दमा स्वास लिन रोकिने ठाउँलाई यति वा विराम भनिन्छ।</p>
                <p><strong>तुक:</strong> एउटै उच्चारण हुने शब्दहरूको प्रयोगलाई तुक भनिन्छ।</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ChhandaGyan
