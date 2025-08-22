import React from 'react';
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-teal-500 text-white py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Trend Home</h3>
            <div className="space-y-2 text-sm sm:text-base">
              <p>Sigmaringerstraße 24 Showroom:<br />Max-Eyth-Str. 19B 71332 Waiblingen</p>
              <p><strong>Phone:</strong> +49 (0) 179 74 25361</p>
              <p><strong>Email:</strong> info@trendhome-fenster.de</p>
            </div>
            <div className="flex space-x-4 text-white text-lg sm:text-xl mt-4">
              <a href="#" className="hover:text-gray-200 transition-colors"><FaXTwitter /></a>
              <a href="#" className="hover:text-gray-200 transition-colors"><FaFacebookF /></a>
              <a href="#" className="hover:text-gray-200 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-gray-200 transition-colors"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Nützliche Links</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><a href="/" className="hover:text-gray-200 transition-colors">Startseite</a></li>
              <li><a href="/uber-uns" className="hover:text-gray-200 transition-colors">Über uns</a></li>
              <li><a href="/dienstleistungen" className="hover:text-gray-200 transition-colors">Dienstleistungen</a></li>
              <li><a href="/nutzungsbedingungen" className="hover:text-gray-200 transition-colors">Nutzungsbedingungen</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Unsere Dienstleistungen</h4>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>Fensterinstallation</li>
              <li>Türinstallation</li>
              <li>Energieberatung</li>
              <li>Reparaturservice</li>
              <li>Maßanfertigung</li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-teal-400 mt-8 pt-6 text-center">
          <div className="text-sm space-y-2">
            <p>© Urheberrecht – <span className="font-semibold">Alle Rechte vorbehalten</span></p>
            <p>Designed by <a href="https://mgbtechnologies.com" className="hover:text-gray-200 transition-colors font-medium">MGB Technologies Pvt. Ltd.</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
