import React from 'react'
// Images import गर्ने - deployment को लागि src folder मा राखिएको
import headerImage from '../assets/images/image.png'
import profileImage from '../assets/images/pic.png'

const About = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <img
              src={headerImage}
              alt="About Heading"
              className="w-full max-w-5xl mx-auto mb-6 object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>
          <h1 className="section-title mb-6 font-devanagari">प्रा.डा. देवी नेपाल ः व्यक्तिविवरण</h1>
          <div className="sanskrit-divider"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start mb-12 sm:mb-16">
            {/* Image */}
            <div className="flex justify-center order-1 md:order-1">
              <div className="relative w-full max-w-xs sm:max-w-md">
                <div className="absolute inset-0 bg-gradient-to-br from-saffron-300 to-sandalwood-400 blur-xl sm:blur-2xl opacity-20 sm:opacity-30"></div>
                <img
                  src={profileImage}
                  alt="डा. देवी नेपाल"
                  className="relative w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4 sm:space-y-6 order-2 md:order-2">
              {/* नोट: यो block ले व्यक्तिगत विवरणलाई कार्ड जस्तो देखिने गरी प्रस्तुत गर्छ */}
              <div className="rounded-2xl border border-parchment-200 bg-white/70 backdrop-blur-sm shadow-sm p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-saffron-700 mb-4 font-devanagari">व्यक्तिगत विवरण</h3>
                <div className="space-y-2 text-base sm:text-lg text-parchment-800 font-devanagari leading-relaxed">
                  <p><strong>पूरा नाम:</strong> प्रा.डा. देवीप्रसाद नेपाल</p>
                  <p><strong>साहित्यमा:</strong> प्रा.डा. देवी नेपाल</p>
                  <p><strong>जन्म:</strong> २०३० वैशाख १८</p>
                  <p><strong>माता÷पिता:</strong> मनमाया÷कुबेरनाथ नेपाल</p>
                  <p><strong>जन्मस्थान:</strong> हल्दीबारी—१, गोल्धाप, झापा</p>
                  <p><strong>स्थायी ठेगाना:</strong> शिवसताक्षी नगरपालिका–११, दुधे, झापा</p>
                  <p><strong>हालको ठेगाना:</strong> मध्यपुर ठिमी न.पा. १, लोहकिल्थली, भक्तपुर</p>
                </div>
              </div>

              {/* नोट: शिक्षा र सेवा सम्बन्धी मुख्य बुँदा */}
              <div className="rounded-2xl border border-parchment-200 bg-white/70 backdrop-blur-sm shadow-sm p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-saffron-700 mb-4 font-devanagari">शिक्षा</h3>
                <ul className="space-y-2 text-base sm:text-lg text-parchment-800 font-devanagari leading-relaxed list-disc pl-5">
                  <li>विद्यावारिधि (पिएच.डी) (प्रगतिवादी नेपाली खण्डकाव्यमा द्वन्द्वविधान)</li>
                  <li>एम.ए. (नेपाली, प्रथम श्रेणी)</li>
                  <li>आचार्य (साहित्य, प्रथम श्रेणी)</li>
                  <li>बी.एड. (नेपाली, एक वर्षे)</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-parchment-200 bg-white/70 backdrop-blur-sm shadow-sm p-5 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-bold text-saffron-700 mb-4 font-devanagari">सेवा/जिम्मेवारी (संक्षेप)</h3>
                <div className="space-y-2 text-base sm:text-lg text-parchment-800 font-devanagari leading-relaxed">
                  <p><strong>प्राध्यापन सेवा:</strong> प्राध्यापक, वाल्मीकि क्याम्पस, काठमाडौँ ।</p>
                  <p><strong>प्राज्ञिक सेवा:</strong> प्राज्ञ परिषद् सदस्य तथा विभागीय प्रमुख, साहित्य (बालसाहित्य र लोकवार्ता) विभाग, नेपाल प्रज्ञा–प्रतिष्ठान, काठमाडौँ (२०७५—२०७९) ।</p>
                  <p><strong>अनुसन्धान:</strong> अनुसन्धान परिषद्सदस्य, नेपाल संस्कृत विश्वविद्यालय, अनुसन्धान केन्द्र, दाब (२०८१ — हालसम्म) ।</p>
                  <p><strong>विषयगत जिम्मेवारी:</strong> सदस्य, नेपाली विषय समिति, पाठ्यक्रम विकास केन्द्र, सानोठिमी, भक्तपुर (२०७७—२०७९) ।</p>
                </div>
              </div>
            </div>
          </div>

          {/* विस्तृत विवरणहरू: लामो सूचीहरूलाई collapse/expand (details) मा राखिएको */}
          <div className="space-y-6">
            {/* सम्पर्क */}
            <section className="rounded-2xl border border-parchment-200 bg-white/70 backdrop-blur-sm shadow-sm p-5 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-saffron-700 mb-4 font-devanagari">सम्पर्क</h2>
              <div className="space-y-2 text-base sm:text-lg text-parchment-800 font-devanagari leading-relaxed">
                <p><strong>ठेगाना:</strong> लोहकिन्थली, भक्तपुर</p>
                <p><strong>फोन:</strong> ०१–५६३९९५३ (निवास) — ९८५१०९८९५३ (साथमा)</p>
                <p><strong>विद्युतीय हुलाक:</strong> mchmभखष्लभउब२िनmबष्।िअयm</p>
              </div>
            </section>

            {/* शिक्षा/सेवा थप विस्तार */}
            <section className="rounded-2xl border border-parchment-200 bg-white/70 backdrop-blur-sm shadow-sm p-5 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-saffron-700 mb-4 font-devanagari">प्राज्ञिक सेवा (विस्तार)</h2>
              <div className="space-y-2 text-base sm:text-lg text-parchment-800 font-devanagari leading-relaxed">
                <p><strong>प्राज्ञिक सेवा:</strong> प्राज्ञ परिषद् सदस्य तथा विभागीय प्रमुख, साहित्य (बालसाहित्य र लोकवार्ता) विभाग, नेपाल प्रज्ञा–प्रतिष्ठान, काठमाडौँ (२०७५—२०७९) ।</p>
                <p><strong>अनुसन्धान:</strong> अनुसन्धान परिषद्सदस्य, नेपाल संस्कृत विश्वविद्यालय, अनुसन्धान केन्द्र, दाब (२०८१ — हालसम्म) ।</p>
                <p><strong>विषयगत जिम्मेवारी:</strong> सदस्य, नेपाली विषय समिति, पाठ्यक्रम विकास केन्द्र, सानोठिमी, भक्तपुर (२०७७—२०७९) ।</p>
              </div>
            </section>

            {/* प्रकाशित कृतिहरू */}
            <section className="rounded-2xl border border-parchment-200 bg-white/70 backdrop-blur-sm shadow-sm">
              <details className="p-5 sm:p-6">
                <summary className="cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-saffron-700 font-devanagari">
                      प्रकाशित कृतिहरू (क) साहित्यिक सिर्जना, समालोचना एवम् बालसाहित्य
                    </h2>
                    <span className="text-sm text-parchment-600 font-devanagari">खोल्नुहोस्/बन्द गर्नुहोस्</span>
                  </div>
                </summary>
                <div className="mt-4 text-base sm:text-lg text-parchment-800 font-devanagari leading-relaxed">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>श्रद्धाञ्जली (खण्डकाव्य) २०५७ ।</li>
                    <li>छन्दको सुगन्ध (कविता क्यासेट) २०६० ।</li>
                    <li>छन्द–पराग (छन्दको लक्षणशास्त्र) २०६२ ।</li>
                    <li>त्रिशतक (मुक्तकाव्य) २०६३ ।</li>
                    <li>तितामीठा कुरा (नीतिसङ्ग्रह, सहलेखन) २०६३ ।</li>
                    <li>साहित्य सन्ध्या र पुरस्कृत प्रतिभाहरू (जीवनी समालोचना) २०६४ ।</li>
                    <li>कुखुराको बिहे (बालकाव्य) २०६५ ।</li>
                    <li>गजल कसरी लेख्ने ? (गजलको प्रयोगात्मक कृति) २०६६ ।</li>
                    <li>माटो र मुटु (कवितासङ्ग्रह) २०६७ ।</li>
                    <li>काव्य समालोचना (समालोचनासङ्ग्रह) २०६८ ।</li>
                    <li>समयरेखा (समालोचनासङ्ग्रह) २०६८ ।</li>
                    <li>निबन्ध मुना (बाल निबन्धसङ्ग्रह) २०७० ।</li>
                    <li>निबन्ध कोपिला (बाल निबन्धसङ्ग्रह) २०७१ ।</li>
                    <li>सलादजस्तो देश (कवितासङ्ग्रह) २०७१ ।</li>
                    <li>भानु भन्दै हिँडी रहूँ (यात्राकाव्य) २०७२ ।</li>
                    <li>मैना चरी दब्ग परी (बालकाव्य) २०७२ ।</li>
                    <li>निबन्ध पुष्प (बाल निबन्धसङ्ग्रह) २०७३ ।</li>
                    <li>छन्द–तरब्ग (छन्द–कविताहरूको एकल सिडी) २०७३ ।</li>
                    <li>नाना देऊ पुतली (बाल कवितासङ्ग्रह) २०७४ ।</li>
                    <li>अआ पढ्ने बेला (बाल कवितासङ्ग्रह) २०७४ ।</li>
                    <li>को छ हँ ? (बाल कवितासङ्ग्रह) २०७४ ।</li>
                    <li>गन्दै गन्दै जान्छु (बाल कवितासङ्ग्रह) २०७४ ।</li>
                    <li>आरोहण (संयुक्त महाकाव्य) २०७४ ।</li>
                    <li>क ख ग घ पढ न (बाल कवितासङ्ग्रह) २०७६ ।</li>
                    <li>पागल (खण्डकाव्य, खण्डकाव्यत्रयोदशभित्र) २०७७ ।</li>
                    <li>मामाघरको रोपाइँ (बालकाव्य) २०७७ ।</li>
                    <li>समुद्रमन्थन (खण्डकाव्य) २०७७ ।</li>
                    <li>लेखन शिल्प (के कसरी लेख्ने ?) २०७८ ।</li>
                    <li>सम्यक्दृष्टि (समालोचना) २०७८ ।</li>
                    <li>कृति र प्रवृत्ति (समालोचना) २०७८ ।</li>
                    <li>पहिलो पाठक (समालोचना) २०७८ ।</li>
                    <li>युगकवि सिद्धिचरणका कवितामा लयविधान (समालोचना) २०७९ ।</li>
                    <li>नेपाली खण्डकाव्यको इतिहास (जगदम्बा नेपाली साहित्यको बृहत्इतिहास, भाग–४) २०७९ ।</li>
                  </ol>
                </div>
              </details>
            </section>

            {/* पाठ्यपुस्तक तथा सन्दर्भ पुस्तकहरू */}
            <section className="rounded-2xl border border-parchment-200 bg-white/70 backdrop-blur-sm shadow-sm">
              <details className="p-5 sm:p-6">
                <summary className="cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-saffron-700 font-devanagari">
                      (ख) प्रकाशित नेपाली पाठ्यपुस्तक तथा सन्दर्भ पुस्तकहरू
                    </h2>
                    <span className="text-sm text-parchment-600 font-devanagari">खोल्नुहोस्/बन्द गर्नुहोस्</span>
                  </div>
                </summary>
                <div className="mt-4 text-base sm:text-lg text-parchment-800 font-devanagari leading-relaxed">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>अनिवार्य नेपाली (१०+२) २०५९ ।</li>
                    <li>अनिवार्य नेपाली (प्र.प्र.तह) २०५९ ।</li>
                    <li>बाल रचनामाला (भाग १) २०६१ ।</li>
                    <li>बाल रचनामाला (भाग २) २०६१ ।</li>
                    <li>बाल रचनामाला (भाग ३) २०६१ ।</li>
                    <li>बाल रचनामाला (भाग ४) २०६१ ।</li>
                    <li>बाल रचनामाला (भाग ५) २०६१ ।</li>
                    <li>स्नातक अनिवार्य नेपाली (बी.ए. प्रथम) २०६२ ।</li>
                    <li>नेपाली कविता काव्य (बी.एड. द्वितीय) २०६३ ।</li>
                    <li>सरल नेपाली बाल व्याकरण र रचना (कक्षा १) २०६३ ।</li>
                    <li>सरल नेपाली बाल व्याकरण र रचना (कक्षा २) २०६३ ।</li>
                    <li>सरल नेपाली बाल व्याकरण र रचना (कक्षा ३) २०६३ ।</li>
                    <li>सरल नेपाली बाल व्याकरण र रचना (कक्षा ४) २०६३ ।</li>
                    <li>सरल नेपाली बाल व्याकरण र रचना (कक्षा ५) २०६४ ।</li>
                    <li>निम्न माध्यमिक नेपाली व्याकरण र रचना (कक्षा ६) २०६५ ।</li>
                    <li>निम्न माध्यमिक नेपाली व्याकरण र रचना (कक्षा ७) २०६५ ।</li>
                    <li>निम्न माध्यमिक नेपाली व्याकरण र रचना (कक्षा ८) २०६५ ।</li>
                    <li>माध्यमिक नेपाली व्याकरण र रचना (कक्षा ९) २०६२ ।</li>
                    <li>माध्यमिक नेपाली व्याकरण र रचना (कक्षा १०) २०६२ ।</li>
                    <li>मेरो प्यारो नेपाली (कक्षा ।।।क’) २०६६ ।</li>
                    <li>मेरो प्यारो नेपाली (कक्षा ।।।ख’) २०६६ ।</li>
                    <li>मेरो प्यारो नेपाली (कक्षा ।।।ग’) २०६६ ।</li>
                    <li>मेरो प्यारो नेपाली (कक्षा १) २०६६ ।</li>
                    <li>मेरो प्यारो नेपाली (कक्षा २) २०६६ ।</li>
                    <li>मेरो प्यारो नेपाली (कक्षा ३) २०६६ ।</li>
                    <li>मेरो प्यारो नेपाली (कक्षा ४) २०६६ ।</li>
                    <li>मेरो प्यारो नेपाली (कक्षा ५) २०६६ ।</li>
                    <li>मेरो प्यारो नेपाली (कक्षा ६) २०६६ ।</li>
                    <li>मेरो प्यारो नेपाली (कक्षा ७) २०६६ ।</li>
                    <li>उच्च माध्यमिक नेपाली व्याकरण र रचना (१०+२) २०६९ ।</li>
                    <li>हाम्रो नेपाली किताब (कक्षा–१, पाठ्यक्रम विकास केन्द्र) २०७५ ।</li>
                    <li>हाम्रो नेपाली किताब (कक्षा–२, पाठ्यक्रम विकास केन्द्र) २०७६ ।</li>
                    <li>हाम्रो नेपाली किताब (कक्षा–३, पाठ्यक्रम विकास केन्द्र) २०७६ ।</li>
                    <li>हाम्रो प्यारो नेपाली भाषा (अस्ट्रेलियाको नेपाली भाषा पाठशालाका लागि पाठ्यपुस्तक) २०७८ ।</li>
                  </ol>
                </div>
              </details>
            </section>

            {/* सम्पादित पुस्तक तथा पत्रपत्रिकाहरू */}
            <section className="rounded-2xl border border-parchment-200 bg-white/70 backdrop-blur-sm shadow-sm">
              <details className="p-5 sm:p-6">
                <summary className="cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-saffron-700 font-devanagari">
                      (ग) सम्पादित पुस्तक तथा पत्रपत्रिकाहरू
                    </h2>
                    <span className="text-sm text-parchment-600 font-devanagari">खोल्नुहोस्/बन्द गर्नुहोस्</span>
                  </div>
                </summary>
                <div className="mt-4 text-base sm:text-lg text-parchment-800 font-devanagari leading-relaxed">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>वैचारिक आलोकमा महाकवि देवकोटा (२०६७) – प्रगतिशील लेखक सब्घ, नेपाल ।</li>
                    <li>युगकवि सिद्धिचरण ः एकसय एक कवि एकसय एक कविता (२०७०) युगकवि सिद्धिचरण प्रतिष्ठान ।</li>
                    <li>कथादेखि कथासम्म (कथा सब्ग्रह, २०७१) ः रमेश विकल — ऐरावती प्रकाशन ।</li>
                    <li>मदन भण्डारीका कविता र गीतहरू (२०७१) — राष्ट्रिय जनसांस्कृतिक महासब्घ, नेपाल ।</li>
                    <li>मदन भण्डारीका कविता र गीतहरू (सिडी २०७१) — राष्ट्रिय जनसांस्कृतिक महासब्घ ।</li>
                    <li>मब्गलकुमार उपाध्याय नेपाल ः स्मृतिग्रन्थ (२०७३) — स्मृतिग्रन्थ प्रकाशन समिति ।</li>
                    <li>छन्द–तरब्ग (भाग–१, २०७६) — लेखन कुञ्ज, काठमाडौँ ।</li>
                    <li>बालप्रज्ञा (अर्धवार्षिक बालपत्रिका) — नेपाल प्रज्ञा–प्रतिष्ठान, संस्थापक प्रधान सम्पादक ।</li>
                    <li>राष्ट्रिय कविता महोत्सव ः पुरस्कृत कविताहरू ः नेपाल प्रज्ञा–प्रतिष्ठान २०७७ ।</li>
                    <li>प्रज्ञा नेपाली लोककथा ः नेपाल प्रज्ञा–प्रतिष्ठान, २०७७ ।</li>
                    <li>नेपाली लोकवार्ताकोश ः नेपाल प्रज्ञा–प्रतिष्ठान, २०७९ ।</li>
                    <li>नेपाली बालसाहित्यको इतिहास ः नेपाल प्रज्ञा–प्रतिष्ठान, २०७९ ।</li>
                    <li>सनातन संस्कृति विश्वकोश ः नेपाल प्रज्ञा–प्रतिष्ठान, २०७९, विशेष सम्पादक ।</li>
                    <li>लेखक साहित्यकार परिचयकोश ः नेपाल प्रज्ञा–प्रतिष्ठान, २०७९, विशेष सम्पादक ।</li>
                    <li>स्मृतिविम्बमा शम्भुकुमार मिलन ः शम्भु–निर्मला कला–साहित्य समाज, २०८०, प्रधान सम्पादक ।</li>
                    <li>युगकवि सिद्धिचरणका गद्यकविता (कवितासब्ग्रह, २०८१) ः युगकवि सिद्धिचरण प्रतिष्ठान ।</li>
                  </ol>
                  <p className="mt-4 text-sm sm:text-base text-parchment-700">
                    आधा दर्जन साहित्यिक पत्रपत्रिकाहरू, एक दर्जन पुस्तकहरू र २०० भन्दा बढी पुस्तक तथा पत्रपत्रिकाको भाषा सम्पादन ।
                  </p>
                </div>
              </details>
            </section>

            {/* प्रकाशोन्मुख कृतिहरू */}
            <section className="rounded-2xl border border-parchment-200 bg-white/70 backdrop-blur-sm shadow-sm p-5 sm:p-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-saffron-700 mb-4 font-devanagari">(घ) प्रकाशोन्मुख साहित्यिक कृतिहरू</h2>
              <div className="text-base sm:text-lg text-parchment-800 font-devanagari leading-relaxed">
                <p>१. गजलको सौन्दर्य शास्त्र (समालोचना)</p>
                <p>२. समालोचनासब्ग्रह – १</p>
                <p>३. भूमिकासब्ग्रह – २</p>
                <p>४. कवितासब्ग्रह – १</p>
                <p>५. गजलसब्ग्रह – १</p>
                <p>६. गीतसब्ग्रह – १</p>
                <p>७. पवनदूत (महाकाव्य, लेखनको चरणमा)</p>
              </div>
            </section>

            {/* पुरस्कार तथा सम्मान */}
            <section className="rounded-2xl border border-parchment-200 bg-white/70 backdrop-blur-sm shadow-sm">
              <details className="p-5 sm:p-6">
                <summary className="cursor-pointer select-none">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-saffron-700 font-devanagari">पुरस्कार तथा सम्मान</h2>
                    <span className="text-sm text-parchment-600 font-devanagari">खोल्नुहोस्/बन्द गर्नुहोस्</span>
                  </div>
                </summary>
                <div className="mt-4 text-base sm:text-lg text-parchment-800 font-devanagari leading-relaxed">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>युवा वर्ष मोती पुरस्कार (२०६७)</li>
                    <li>शुभ प्रभात काव्य सम्मान (२०६३)</li>
                    <li>अविरल साहित्य सम्मान, सिन्धुपाल्चोक (२०६३)</li>
                    <li>बुटवल साहित्य, कला, संस्कृति प्रतिष्ठानद्वारा सम्मान (२०५९)</li>
                    <li>प्रगतिशील लेखक सब्घ, बाँके शाखा, नेपालगन्जद्वारा सम्मान (२०६४)</li>
                    <li>अनौपचारिक साहित्य प्रतिष्ठान, रामेछापद्वारा सम्मान (२०६५)</li>
                    <li>सिन्धुपाल्चोकका महेन्द्रोदय उमावि, टुकी सब्घ र ग्रा.म. सि. समूहद्वारा संयुक्त सम्मान (२०६४)</li>
                    <li>अनाममण्डली (मलेसिया) बाट सम्मान (२०६७)</li>
                    <li>अन्तर्राष्ट्रिय नेपाली साहित्य समाज (मलेसिया शाखा) बाट सम्मान (२०६७)</li>
                    <li>उदाउँदो तारा साहित्य समाज (पेन्याब, मलेसिया) बाट सम्मान (२०६७)</li>
                    <li>प्रवासी नयन साहित्य समाज (जोहोर, मलेसिया) बाट सम्मान (२०६७)</li>
                    <li>भेरी साहित्य समाज (केन्द्र) बाट सम्मान (२०६८)</li>
                    <li>भेरी साहित्य समाज (सुर्खेत शाखा) बाट सम्मान (२०६८)</li>
                    <li>श्री राजर्षि वाब्मय प्रतिष्ठान, नेपाल, जनकपुरबाट सम्मान (२०६८)</li>
                    <li>राप्ती साहित्य परिषदबाट पुरस्कार (२०५२)</li>
                    <li>साहित्य कुञ्ज कीर्तिपुरबाट पुरस्कार (२०५३ र २०६४ दुई पटक)</li>
                    <li>राष्ट्रिय गजल प्रतियोगिताबाट पुरस्कार (२०५७)</li>
                    <li>सिर्जनशील विद्यार्थी समाज, कीर्तिपुरद्वारा सम्मान (२०६२)</li>
                    <li>ओम्ज्ञान मन्दिर साहित्यिक मञ्चद्वारा स्रष्टा सम्मान (२०६३)</li>
                    <li>नेक्सस इन्टरनेसनल स्कुल, पेप्सीकोलाद्वारा स्रष्टा सम्मान (२०६६)</li>
                    <li>महाकवि देवकोटा साहित्यिक कला सब्ग्रहालय प्रतिष्ठान, नेपालबाट कवि सम्मान (२०६९)</li>
                    <li>शुक्ला साहित्य सम्मान, तनहुँ (२०७०)</li>
                    <li>अन्तर्राष्ट्रिय नेपाली गजल महोत्सव, काठमाडौँबाट सम्मान (२०७१)</li>
                    <li>शारदा कोइराला बाल साहित्य वाणी पुरस्कार (२०७०)</li>
                    <li>हिमालचुली साहित्य प्रतिष्ठान, छन्दकला प्रतिष्ठान र मुक्तक मञ्च लमजुब सम्मान (२०७१)</li>
                    <li>वैजयन्ती स्रष्टा सम्मान (२०७१)</li>
                    <li>स्रष्टा प्रतिष्ठान नेपालबाट सम्मान (२०७१)</li>
                    <li>चुनदेवी सहयोगी संस्था, बाँसबारीबाट सम्मान (२०७२)</li>
                    <li>असम नेपाली साहित्य सभा, गुवाहाटीबाट सम्मान (२०७२)</li>
                    <li>छन्दवादी समाज नेपाल, रूपन्देहीबाट ‘छन्दरथी’ उपाधिबाट सम्मान (२०७३)</li>
                    <li>ज्योति स्रष्टा सम्मान (२०७३)</li>
                    <li>तोयनाथ पाण्डेय पशुपतिकुमारी पुरस्कार (२०७३)</li>
                    <li>ज्ञानदीप शिक्षा सदन सम्मान (२०७४)</li>
                    <li>महाकाली गजल प्रतिष्ठानबाट सम्मान (२०७४)</li>
                    <li>साहित्य कला सब्गम, दमकबाट सम्मान (२०७४)</li>
                    <li>प्रगतिशील मावि, भिरपानी, रामेछापबाट सम्मान (२०७४)</li>
                    <li>भानु उत्कृष्ट रचना पुरस्कार (२०७४)</li>
                    <li>दोभान पुस्तकालय, चितवनबाट सम्मान (२०७४)</li>
                    <li>कमल गाउँपालिका, झापाबाट सम्मान (२०७५)</li>
                    <li>झरना साहित्यिक परिवार मकवानपुरबाट सम्मान (२०७५)</li>
                    <li>नेपाल बालसाहित्य समाजबाट सम्मान (२०७५)</li>
                    <li>नेपाल वंशज परिषद्काठमाडौँबाट सम्मान (२०७५)</li>
                    <li>कोटेश्वर बहुमुखी क्याम्पसबाट सम्मान (२०७५)</li>
                    <li>सिलगडी नेपाली साहित्य प्रचार समिति, भारतबाट सम्मान (२०७६)</li>
                    <li>साहित्य सुनौँ परिवार, मिरिक, दार्जिलिब, भारतबाट सम्मान (२०७६)</li>
                    <li>अनेसास भानु स्रष्टा सम्मान (२०७७)</li>
                    <li>मोहनमाया साहित्य साधना पुरस्कार, मकवानपुर (२०७८)</li>
                    <li>टीकाप्रसाद–नारायणी काफ्ले स्मृति साहित्य सम्मान तथा पुरस्कार (२०७९)</li>
                    <li>प्रोग्रेसिभ एजुकेसनल फोरम, काठमाडौँबाट अभिनन्दन (२०८०)</li>
                    <li>लुम्बिनी वाब्मय प्रतिष्ठान, नेपालबाट सम्मान (२०८०)</li>
                    <li>लालबन्दी नगर वाब्मय परिषद्, सर्लाहीबाट सम्मान (२०८०)</li>
                    <li>नवसर्जक साहित्यिक चौतारी नेपालबाट सम्मान (२०८०)</li>
                    <li>भेरी साहित्य समाज, बर्दियाबाट सम्मान (२०८०)</li>
                    <li>साइपाल एकेडेमी, काठमाडौँबाट सम्मान (२०८०)</li>
                    <li>भवानी मिश्र पुरस्कार, दमक, झापा (२०८०)</li>
                    <li>पूर्णिमा साहित्य रत्न पुरस्कार (२०८०)</li>
                    <li>रिडर्स इन्टरनेसनल मोडल स्कुल, काठमाडौँबाट सम्मान (२०८०)</li>
                    <li>सिद्धार्थ नमुना मावि, रोल्पाबाट सम्मान (२०८०)</li>
                    <li>बोधनाथ–हिमकुमारी लामिछाने पुरस्कार, चितवन (२०८१)</li>
                    <li>साहित्य चौतारी बिर्तामोड झापाबाट सम्मान (२०८१)</li>
                    <li>प्याब्सन काठमाडौँ महानगरबाट अभिनन्दन (२०८१)</li>
                    <li>फास्टफुड एसोसिएसन, नेपालबाट सम्मान (२०८१)</li>
                    <li>भक्तपुर बुढ्यौली साहित्य समाजबाट सम्मान (२०८१)</li>
                    <li>निरु शर्मा पराजुली स्मृति अन्तर्राष्ट्रिय पुरस्कार, असम, भारत (सन् २०२४)</li>
                    <li>साहित्य परिक्रमा परिवार, डुवर्स भारतबाट सम्मान (सन् २०२४)</li>
                    <li>काठमाडौँ कोलम्बस स्कुलबाट सम्मान (२०८१)</li>
                    <li>युगकवि सिद्धिचरण श्रेष्ठ राष्ट्रिय पुरस्कार (२०८१)</li>
                    <li>वनिताश्री देवकुमारी थापा बालसाहित्य पुरस्कार (२०८२)</li>
                    <li>राष्ट्रिय सुसेली फाउन्डेसनबाट सम्मान (२०८२)</li>
                    <li>छथर साहित्यिक समाज तेह्रथुमबाट सम्मान (२०८२)</li>
                    <li>अनुशीलन नेपाल, भक्तपुरबाट सम्मान (२०८२)</li>
                    <li>कर्ण–दुर्गा स्मृति प्रतिष्ठान, दार्जिलिबबाट सम्मान (सन् २०२५)</li>
                    <li>अनाममण्डली, काठमाडौँबाट सम्मान (२०८२)</li>
                    <li>सुदूरपश्चिम प्रज्ञा–प्रतिष्ठानबाट अभिनन्दन (२०८२)</li>
                    <li>मानव पुस्तकालय अभियान काठमाडौँबाट सम्मान (२०८२)</li>
                    <li>त्रि.वि. प्राध्यापक सब्घ ललितकला क्याम्पस एकाइबाट सम्मान (२०८२)</li>
                    <li>भानु प्रतिष्ठान, भानु विशेष काव्यसाँझ, कदरपत्र (२०८२)</li>
                    <li>अर्गनाइजेसन अफ प्राइभेट स्कुल (ओप्स) काठमाडौँबाट सम्मान (२०८२)</li>
                    <li>राइडर्स महफिल, विराटचोक, मोरबबाट सम्मान (२०८२)</li>
                  </ol>
                </div>
              </details>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
