import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Phone, Mail, MapPin, Clock, Linkedin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-xl font-bold">KAKVERA GLOBAL</div>
                <div className="text-sm text-blue-400 font-medium">SERVICES</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              "Bringing the world to Nigeria" - Your trusted partner in international trade and logistics, 
              connecting Nigerian businesses and individuals with global markets since 2015.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/kakveraglobal/" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/kakveraglobal" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://twitter.com/kakveraglobal" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://facebook.com/KakveraGlobalServices" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">About Us</Link>
              <Link to="/services" className="block text-gray-300 hover:text-white transition-colors">Services</Link>
              <Link to="/industries" className="block text-gray-300 hover:text-white transition-colors">Industries</Link>
              <Link to="/why-choose-us" className="block text-gray-300 hover:text-white transition-colors">Why Choose Us</Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <div className="text-gray-300 text-sm">
                  14, Blueroof Avenue, off Lasu-Isheri Road, Lagos, Nigeria
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-blue-400" />
                <div className="text-gray-300 text-sm">+234 816 277 7605</div>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-400" />
                <div className="text-gray-300 text-sm">info@kakveraglobal.com</div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <div className="text-gray-300 text-sm">
                  Mon-Fri: 9am-6pm WAT<br />Sat: 12pm-4pm WAT
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Kakvera Global Services. All rights reserved. RC: 2342761
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;