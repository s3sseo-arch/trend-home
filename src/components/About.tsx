import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section with Stylish Banner */}
      <section className="relative w-full h-[32rem] overflow-hidden">
        <img
          src="../img/doctors-1.jpg"
          alt="Modern home with windows"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent backdrop-blur-sm flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-md animate-fadeIn">
            Verwandeln Sie Ihr Zuhause noch heute
          </h1>
          <p className="mt-4 max-w-3xl text-lg md:text-xl text-white/90 animate-fadeIn delay-150">
            Entdecken Sie eine große Auswahl an hochwertigen gefertigten Fenstern und Türen, die modernes Design mit erstklassiger Funktionalität vereinen.
          </p>
          <button className="mt-6 px-8 py-3 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-blue-100 transition animate-fadeIn delay-300">
            Mehr erfahren
          </button>
        </div>
      </section>

      {/* Über Uns */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Über uns</h2>
        <p className="text-center text-gray-700 max-w-4xl mx-auto mb-12">
          TrendHome Fenster – Ihr Fenster direkt vom Hersteller: Wartungsfrei • Schallschutz • Thermisch & Brandsicher • Schnelle Lieferung • Modernstes Design
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Keine Pflege notwendig</h3>
            <p className="text-gray-600">Nur regelmäßiges Wischen, kein neu Streichen, verzieht nicht, selbst in extremen Klimazonen.</p>

            <h3 className="text-xl font-semibold text-gray-800">Hervorragender Schallschutz</h3>
            <p className="text-gray-600">Für Ruhe zuhause und im Büro; moderne Technik, die Oasen der Stille schafft.</p>

            <h3 className="text-xl font-semibold text-gray-800">Hochwärmedämmend & klimastabil</h3>
            <p className="text-gray-600">Perfekt isoliert von Hitze und Kälte – Spitzenleistung in allen Jahreszeiten.</p>

            <h3 className="text-xl font-semibold text-gray-800">Brandschutz integriert</h3>
            <p className="text-gray-600">Profilsysteme sind selbstlöschend, tragen nicht zur Feuerausbreitung bei.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Direkt vom Werk zum Kunden</h3>
            <p className="text-gray-600">Schlanke Kosten durch Eliminierung von Zwischenhändlern – maximale Qualität zum besten Preis.</p>

            <h3 className="text-xl font-semibold text-gray-800">Blitzschneller Versand</h3>
            <p className="text-gray-600">Tag 1 Messen, Tag 2 Produktion, Tag 3 Lieferung – und Sie sind informiert.</p>
          </div>
        </div>
      </section>


 
    </div>
  );
}
