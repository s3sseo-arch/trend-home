import React from 'react';
import { Check, Play } from 'lucide-react';

const Homepage = () => {
  const features = [
    {
      text: "Keine Pflege notwendig – Nur regelmäßiges Wischen, kein neu Streichen, verzieht nicht, selbst in extremen Klimazonen."
    },
    {
      text: "Hervorragender Schallschutz – Für Ruhe zuhause und im Büro; moderne Technik, die Oasen der Stille schafft."
    },
    {
      text: "Hochwärmedämmend & klimastabil – Perfekt isoliert von Hitze und Kälte – Spitzenleistung in allen Jahreszeiten."
    },
    {
      text: "Brandschutz integriert – Profilsysteme sind selbstlöschend, tragen nicht zur Feuerausbreitung bei."
    },
    {
      text: "Direkt vom Werk zum Kunden – Schlanke Kosten durch Eliminierung von Zwischenhändlern – maximale Qualität zum besten Preis."
    },
    {
      text: "Blitzschneller Versand – Tag 1 Messen, Tag 2 Produktion, Tag 3 Lieferung – und Sie sind informiert."
    }
  ];

  return (
    <div>
      {/* Header Section */}
      <header className="relative  bg-no-repeat p-0 m-0" 
              style={{
                backgroundImage: `url("/img/hero-bg.jpg")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            
              }}>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/65"></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-6xl mx-auto">
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Verwandeln Sie Ihr
              Zuhause noch heute
            </h1>
            
            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Entdecken Sie eine große Auswahl an hochwertigen gefertigten Fenstern und Türen, 
              die modernes Design mit erstklassiger Funktionalität vereinen.
            </p>
            
            {/* Button */}
    <button className="relative group px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-4 text-base sm:text-lg md:text-xl font-semibold text-white rounded-full bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 shadow-2xl hover:shadow-blue-800/50 transition duration-300 ease-in-out transform hover:scale-105 overflow-hidden backdrop-blur-lg">
  <span className="absolute inset-0 w-full h-full bg-white opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur-md"></span>
  <span className="relative z-10 flex items-center gap-2">
    Mehr erfahren
    <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </span>
</button>


            
          </div>
        </div>
      </header>

      {/* About Us Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50" >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16" >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4" id='Über-uns'>
              Über uns
            </h2>
            <div className="w-16 h-1 bg-teal-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left side - Image */}
            <div className="relative">
              <div className="overflow-hidden rounded-t-2xl max-w-full mx-auto">
                <img 
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
                  alt="Workers in workshop"
                  className="w-full h-64 sm:h-80 lg:h-full object-cover"/>
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-12 h-12 sm:w-16 sm:h-16 bg-teal-500 hover:bg-teal-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-1" fill="currentColor" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  TrendHome Fenster – Ihr Fenster direkt vom Hersteller
                </h3>
                
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  Wartungsfrei • Schallschutz • Thermisch & Brandsicher • Schnelle 
                  Lieferung • Modernstes Design
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 sm:space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500" />
                    </div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll to top button (bottom right) */}
        <button className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </section>
      
      {/* Services Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Unsere Dienstleistungen
            </h2>
            <div className="w-16 h-1 bg-teal-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 items-start">
            
            {/* Left Column - Services */}
            <div className="space-y-6 sm:space-y-8">
              
              {/* Service 1 */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Maßgeschneiderte Fensterinstallation
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Fachmännisch gefertigte Fenster, individuell auf Ihre Bedürfnisse zugeschnitten.
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Türinstallation und -austausch
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Hochwertige Türen, die für Sicherheit und Stil entworfen wurden.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Energieeffiziente Lösungen
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Fenster und Türen, die das ganze Jahr über Energieeinsparungen verbessern.
                  </p>
                </div>
              </div>

            </div>

            {/* Center Column - Window Image */}
            <div className="relative">
              <div className="bg-gray-100 rounded-lg p-6 sm:p-8 flex items-center justify-center">
                <div className="relative">
                  {/* Window frame */}
                  <div className="w-48 h-60 sm:w-64 sm:h-80 bg-gray-300 rounded-lg relative overflow-hidden shadow-2xl">
                    {/* Window panes */}
                    <div className="absolute inset-4 bg-blue-100 rounded">
                      {/* Cross frame */}
                      <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 transform -translate-y-1"></div>
                      <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-300 transform -translate-x-1"></div>
                      
                      {/* Window handle */}
                      <div className="absolute right-2 sm:right-4 top-1/2 w-2 sm:w-3 h-4 sm:h-6 bg-gray-400 rounded transform -translate-y-2 sm:-translate-y-3"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main heading */}
              <div className="text-center mt-6 sm:mt-8">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Umfassende Fenster- und Türdienstleistungen
                </h3>
                <div className="w-12 h-1 bg-teal-500 mx-auto"></div>
              </div>
            </div>

            {/* Right Column - Services */}
            <div className="space-y-6 sm:space-y-8">
              
              {/* Service 4 */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Fenster- und Türreparatur
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Zuverlässige Reparaturen, die langanhaltende Funktionalität und Ästhetik gewährleisten.
                  </p>
                </div>
              </div>

              {/* Service 5 */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Beratungs- und Designleistungen
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Personalisierte Beratung, die zum einzigartigen Stil Ihres Hauses passt.
                  </p>
                </div>
              </div>

              {/* Service 6 */}
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Gewerbliche Fenster und Türen
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Langlebige, effiziente Lösungen für Unternehmen jeder Größe.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom description */}
          <div className="text-center mt-12 sm:mt-16 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Arbeiten Sie mit einem Unternehmen zusammen, das sich der Exzellenz bei 
              Fenster- und Türinstallationen verschrieben hat und sicherstellt, dass jedes 
              Projekt mit Präzision und Sorgfalt ausgeführt wird.
            </p>
          </div>
        </div>
      </section>
            {/* Why Work With Us Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Warum mit uns arbeiten
            </h2>
            <div className="w-16 h-1 bg-teal-500 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            
            {/* Left side - Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {/* Top left - Worker with measuring tool */}
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Worker measuring"
                    className="w-full h-32 sm:h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>
                
                {/* Top right - Blue accent */}
                <div className="bg-blue-600 rounded-lg shadow-lg flex items-center justify-center h-32 sm:h-48">
                  <div className="text-white text-center p-3 sm:p-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full mx-auto mb-2 sm:mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7L12 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Bottom left - Teal accent */}
                <div className="bg-teal-500 rounded-lg shadow-lg flex items-center justify-center h-32 sm:h-48">
                  <div className="text-white text-center p-3 sm:p-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full mx-auto mb-2 sm:mb-4 flex items-center justify-center">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                
                {/* Bottom right - Worker in workshop */}
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
                    alt="Worker in workshop"
                    className="w-full h-32 sm:h-48 object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className="space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              
              <div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Warum wir die richtige Wahl für Ihr Zuhause sind
                </h3>
                
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 italic">
                  Arbeiten Sie mit einem Unternehmen zusammen, das sich der Exzellenz 
                  bei Fenster- und Türinstallationen verschrieben hat und sicherstellt, dass 
                  jedes Projekt mit Präzision und Sorgfalt ausgeführt wird.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                      Unübertroffene Qualität
                    </h4>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                      Meisterhafte Handwerkskunst
                    </h4>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                      Individuelle Lösungen
                    </h4>
                  </div>
                </div>

                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                      Fachkundige Handwerkskunst
                    </h4>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Mehr erfahren
              </button>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-500 mb-1 sm:mb-2">
                    98%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Erfolgreicher Kunde
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-500 mb-1 sm:mb-2">
                    1,500+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Gelieferte Lösungen
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-teal-500 mb-1 sm:mb-2">
                    12+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Jahre Erfahrung
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
         {/* Features Banner */}
     
            {/* Features Banner */}
      <section className="py-8 sm:py-12 bg-white border-t border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            
            {/* Feature 1 - Free Shipping */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                  Kostenloser Versand
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Kostenloser Versand ab 100€
                </p>
              </div>
            </div>

            {/* Feature 2 - Secure Payment */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                  Sichere Zahlung
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  100% sichere Zahlung
                </p>
              </div>
            </div>

            {/* Feature 3 - 24/7 Support */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                  24/7 Support
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Qualitativer 24/7 Support
                </p>
              </div>
            </div>

            {/* Feature 4 - Money Back */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                  Kostenloser Versand
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Geld zurück für Kunden
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Kundenmeinungen: Ihre Zufriedenheit zählt
            </h2>
            <div className="w-16 h-1 bg-teal-500 mx-auto mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Wir streben bei jedem Projekt nach Exzellenz. Unsere Kunden teilen ihre Zufriedenheit 
              und Erfahrungen – ein Beweis für unser Engagement für Qualität und Service.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            
            {/* Testimonial 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 relative">
              {/* Quote Icon */}
              <div className="text-teal-400 text-4xl sm:text-6xl leading-none mb-3 sm:mb-4">"</div>
              
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 italic">
                Zuverlässig, schnell, professionell. Die Fenster wurden exakt nach Maß 
                gefertigt. Beratung und Service waren hervorragend. Ich bin sehr zufrieden.
              </p>
              
              {/* Customer Info */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Michael Schuster"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">Michael Schuster</h4>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 relative">
              {/* Quote Icon */}
              <div className="text-teal-400 text-4xl sm:text-6xl leading-none mb-3 sm:mb-4">"</div>
              
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 italic">
                Modernes Design, hochwertige Materialien und faire Preise. Trend 
                Home hat bei mir einen super Eindruck hinterlassen. Jederzeit wieder!
              </p>
              
              {/* Customer Info */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Jonas Keller"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">Jonas Keller</h4>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 relative sm:col-span-2 lg:col-span-1">
              {/* Quote Icon */}
              <div className="text-teal-400 text-4xl sm:text-6xl leading-none mb-3 sm:mb-4">"</div>
              
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 italic">
                Trend Home überzeugt mit Design und Technik. Die Fenster bieten tolle 
                Wärmedämmung und Schallschutz. Montage lief reibungslos – absolut empfehlenswert!
              </p>
              
              {/* Customer Info */}
              <div className="flex items-center space-x-3 sm:space-x-4">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Tobias Hartmann"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-gray-900">Tobias Hartmann</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-2 sm:space-x-3">
            <button className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300 hover:bg-teal-500 transition-colors duration-200"></button>
            <button className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300 hover:bg-teal-500 transition-colors duration-200"></button>
            <button className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300 hover:bg-teal-500 transition-colors duration-200"></button>
            <button className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-teal-500"></button>
            <button className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gray-300 hover:bg-teal-500 transition-colors duration-200"></button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;