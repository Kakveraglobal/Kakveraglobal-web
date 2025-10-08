import React from 'react';
import { ShoppingBag, Store, ExternalLink, ArrowRight, CheckCircle, Globe, Users, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const OurBrands = () => {
  const ownedBrands = [
    {
      name: 'Kakvera Style',
      tagline: 'Affordable Fashion, Global Style',
      description: 'Premium watches, jewelry, bags, and accessories sourced from around the world. Experience quality fashion at unbeatable prices.',
      category: 'Fashion & Accessories',
      url: 'https://kakverastyle.com',
      features: [
        'Luxury watches and timepieces',
        'Designer bags and purses',
        'Fashion jewelry and accessories',
        'Wholesale & retail options',
        'Multi-currency support (USD, NGN, CNY)',
        'Global shipping available'
      ],
      gradient: 'from-purple-600 to-pink-600',
      icon: ShoppingBag,
      badge: 'Our Retail Brand',
      badgeColor: 'bg-purple-100 text-purple-700'
    }
    // Add more owned brands here when ready
  ];

  const partnerShops = [
    {
      name: '[Partner Shop Name]',
      tagline: 'Shop tagline here',
      description: 'Description of the partner shop and what they offer...',
      category: 'Category',
      url: '#',
      features: [
        'Feature 1',
        'Feature 2',
        'Feature 3'
      ],
      gradient: 'from-blue-600 to-cyan-600',
      icon: Store,
      badge: 'Partner Shop',
      badgeColor: 'bg-blue-100 text-blue-700',
      comingSoon: true
    }
    // Add real partner shops here
  ];

  const allShops = [...ownedBrands, ...partnerShops];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Brands & Partner Shops</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Explore our family of retail brands and trusted partner shops, all powered by our 
              global import expertise and logistics network
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Globe className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Sourcing</h3>
              <p className="text-gray-600">
                All our brands leverage our extensive global supplier network
              </p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Package className="h-8 w-8 text-purple-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Every product goes through our rigorous quality verification process
              </p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customer First</h3>
              <p className="text-gray-600">
                Dedicated customer support across all our brands and partners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands & Shops Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {allShops.map((shop, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Image/Visual Side */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className={`relative h-96 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br ${shop.gradient}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <shop.icon className="h-32 w-32 text-white opacity-30" />
                    </div>
                    {shop.comingSoon && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white text-3xl font-bold mb-2">Coming Soon</div>
                          <div className="text-white/80">Stay tuned for updates</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content Side */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className={`inline-block px-4 py-2 ${shop.badgeColor} rounded-full text-sm font-semibold mb-4`}>
                    {shop.badge}
                  </div>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                    {shop.name}
                  </h2>
                  
                  <p className="text-xl text-gray-600 mb-4 font-medium">
                    {shop.tagline}
                  </p>
                  
                  <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm mb-6">
                    {shop.category}
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {shop.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {shop.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  {shop.comingSoon ? (
                    <button 
                      disabled
                      className="inline-flex items-center px-8 py-4 bg-gray-300 text-gray-500 font-semibold rounded-lg cursor-not-allowed"
                    >
                      Coming Soon
                    </button>
                  ) : (
                    <a
                      href={shop.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                      Visit {shop.name}
                      <ExternalLink className="ml-2 h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner With Us Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Store className="h-16 w-16 text-blue-700 mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Want to Partner With Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            If you're a retailer looking to expand your product sourcing or want to collaborate 
            with our logistics network, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors duration-200"
            >
              Become a Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Our Brands Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Backed by Import Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every brand in our network benefits from our decade of experience in international 
              trade, logistics, and quality assurance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Shoppers</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <span className="text-gray-700">Authentic products from verified global suppliers</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <span className="text-gray-700">Competitive pricing through direct sourcing</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <span className="text-gray-700">Quality assurance and customer support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <span className="text-gray-700">Fast and reliable delivery across Nigeria</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Partners</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <span className="text-gray-700">Access to our global supplier network</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <span className="text-gray-700">Streamlined import and customs clearance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <span className="text-gray-700">Logistics and warehousing support</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                  <span className="text-gray-700">Marketing and brand development assistance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Build Your Own Brand?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let us help you source, import, and manage your inventory just like we do for our brands
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OurBrands;

