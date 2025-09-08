import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Globe, MessageCircle } from 'lucide-react';

const Contact = () => {
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    productDetails: '',
    quantity: '',
    deliveryTimeline: ''
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General',
    message: ''
  });

  const [activeForm, setActiveForm] = useState<'quote' | 'contact'>('quote');

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Quote Request from ${quoteForm.name}`;
    const body = `Name: ${quoteForm.name}%0D%0AEmail: ${quoteForm.email}%0D%0APhone: ${quoteForm.phone}%0D%0AProduct Details: ${quoteForm.productDetails}%0D%0AQuantity: ${quoteForm.quantity}%0D%0ADelivery Timeline: ${quoteForm.deliveryTimeline}`;
    window.location.href = `mailto:info@kakveraglobal.com?subject=${subject}&body=${body}`;
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailMap = {
      'General': 'info@kakveraglobal.com',
      'Trade': 'trade@kakveraglobal.com',
      'Imports': 'imports@kakveraglobal.com',
      'Exports': 'exports@kakveraglobal.com',
      'Support': 'support@kakveraglobal.com'
    };
    
    const email = emailMap[contactForm.subject as keyof typeof emailMap];
    const subject = `${contactForm.subject} Inquiry from ${contactForm.name}`;
    const body = `Name: ${contactForm.name}%0D%0AEmail: ${contactForm.email}%0D%0APhone: ${contactForm.phone}%0D%0AMessage: ${contactForm.message}`;
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Ready to start your international trade journey? Contact our expert team today
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <Phone className="h-12 w-12 text-blue-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone & WhatsApp</h3>
              <a href="tel:+2348162777605" className="text-blue-700 hover:text-blue-800 font-medium">
                +234 816 277 7605
              </a>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <Mail className="h-12 w-12 text-blue-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
              <a href="mailto:info@kakveraglobal.com" className="text-blue-700 hover:text-blue-800 font-medium">
                info@kakveraglobal.com
              </a>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <MapPin className="h-12 w-12 text-blue-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Office Address</h3>
              <p className="text-gray-600 text-sm">
                14, Blueroof Avenue, off Lasu-Isheri Road, Lagos, Nigeria
              </p>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-blue-700 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
              <p className="text-gray-600 text-sm">
                Mon-Fri: 9am-6pm WAT<br />
                Sat: 12pm-4pm WAT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Forms Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Let's Start Your Project
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose how you'd like to connect with us - request a detailed quote or send us a general inquiry
            </p>
          </div>

          {/* Form Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveForm('quote')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeForm === 'quote'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Request Quote
              </button>
              <button
                onClick={() => setActiveForm('contact')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeForm === 'contact'
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                General Inquiry
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Forms */}
            <div>
              {activeForm === 'quote' ? (
                <form onSubmit={handleQuoteSubmit} className="space-y-6">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Globe className="h-6 w-6 text-blue-700 mr-2" />
                      Request a Quote
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="quote-name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="quote-name"
                          value={quoteForm.name}
                          onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="quote-email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="quote-email"
                          value={quoteForm.email}
                          onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="quote-phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="quote-phone"
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm({...quoteForm, phone: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                        placeholder="+234 xxx xxx xxxx"
                      />
                    </div>

                    <div>
                      <label htmlFor="product-details" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Details *
                      </label>
                      <textarea
                        id="product-details"
                        value={quoteForm.productDetails}
                        onChange={(e) => setQuoteForm({...quoteForm, productDetails: e.target.value})}
                        required
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                        placeholder="Describe the products you want to import, including specifications, brands, models, etc."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity/Volume *
                        </label>
                        <input
                          type="text"
                          id="quantity"
                          value={quoteForm.quantity}
                          onChange={(e) => setQuoteForm({...quoteForm, quantity: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                          placeholder="e.g., 100 pieces, 1 container"
                        />
                      </div>
                      <div>
                        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
                          Delivery Timeline *
                        </label>
                        <input
                          type="text"
                          id="timeline"
                          value={quoteForm.deliveryTimeline}
                          onChange={(e) => setQuoteForm({...quoteForm, deliveryTimeline: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                          placeholder="e.g., Within 30 days"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Request Quote
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <MessageCircle className="h-6 w-6 text-blue-700 mr-2" />
                      Send Us a Message
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="contact-name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="contact-email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                        placeholder="+234 xxx xxx xxxx"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject Category *
                      </label>
                      <select
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                      >
                        <option value="General">General Inquiry</option>
                        <option value="Trade">Trade & Logistics</option>
                        <option value="Imports">Import Services</option>
                        <option value="Exports">Export Services</option>
                        <option value="Support">Customer Support</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent transition-colors"
                        placeholder="Tell us about your inquiry or requirements..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 flex items-center justify-center"
                    >
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Contact Details & Map */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Visit Our Office</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-blue-700 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Address</h4>
                      <p className="text-gray-600">
                        14, Blueroof Avenue, off Lasu-Isheri Road<br />
                        Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-blue-700 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Business Hours</h4>
                      <p className="text-gray-600">
                        Monday - Friday: 9:00 AM - 6:00 PM WAT<br />
                        Saturday: 12:00 PM - 4:00 PM WAT<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Department-Specific Emails:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">Trade & Logistics:</span>
                        <a href="mailto:trade@kakveraglobal.com" className="text-blue-700 hover:text-blue-800">
                          trade@kakveraglobal.com
                        </a>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">Import Services:</span>
                        <a href="mailto:imports@kakveraglobal.com" className="text-blue-700 hover:text-blue-800">
                          imports@kakveraglobal.com
                        </a>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">Export Services:</span>
                        <a href="mailto:exports@kakveraglobal.com" className="text-blue-700 hover:text-blue-800">
                          exports@kakveraglobal.com
                        </a>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-gray-600">Customer Support:</span>
                        <a href="mailto:support@kakveraglobal.com" className="text-blue-700 hover:text-blue-800">
                          support@kakveraglobal.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Prefer to Call?</h3>
                <p className="text-gray-600 mb-4">
                  Speak directly with our trade specialists for immediate assistance
                </p>
                <a
                  href="tel:+2348162777605"
                  className="inline-flex items-center px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call +234 816 277 7605
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Us on the Map</h3>
              <p className="text-gray-600 mb-6">
                Located in the heart of Lagos, easily accessible for meetings and consultations
              </p>
            </div>
            <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Interactive Map</p>
                <p className="text-gray-400 text-sm">14, Blueroof Avenue, off Lasu-Isheri Road, Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;