import React from 'react';
import { Shield, Clock, Award, Users, Globe, CheckCircle, TrendingUp, Heart } from 'lucide-react';

const WhyChooseUs = () => {
  const advantages = [
    {
      title: "Verified Global Partners",
      description: "We work exclusively with verified suppliers who meet our strict quality and reliability standards",
      icon: Shield,
      stats: "500+ Verified Partners"
    },
    {
      title: "Fast Clearance Times",
      description: "Average clearance time of 7-15 days, significantly faster than industry standard",
      icon: Clock,
      stats: "7-15 Days Average"
    },
    {
      title: "Full Compliance Guarantee",
      description: "100% compliance with Nigerian customs regulations and international trade laws",
      icon: Award,
      stats: "100% Compliance Rate"
    },
    {
      title: "Dedicated Support Team",
      description: "24/7 customer support with real-time tracking and updates throughout your shipment journey",
      icon: Users,
      stats: "24/7 Support"
    }
  ];

  const differentiators = [
    {
      title: "Transparent Pricing",
      description: "No hidden fees or surprise charges. Get detailed cost breakdowns upfront",
      icon: TrendingUp
    },
    {
      title: "Quality Assurance",
      description: "Rigorous quality checks and supplier verification before every shipment",
      icon: CheckCircle
    },
    {
      title: "Local Expertise",
      description: "Deep understanding of Nigerian market needs and regulatory requirements",
      icon: Heart
    },
    {
      title: "Global Network",
      description: "Extensive network of partners across major manufacturing and trading hubs",
      icon: Globe
    }
  ];


  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Why Choose KAKVERA Global?</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Proven excellence, trusted partnerships, and unmatched reliability in international trade
            </p>
          </div>
        </div>
      </section>

      {/* Main Advantages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Key Advantages
            </h2>
            <p className="text-xl text-gray-600">
              What sets us apart in the competitive world of international trade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <advantage.icon className="h-8 w-8 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {advantage.description}
                    </p>
                    <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      {advantage.stats}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              What Makes Us Different
            </h2>
            <p className="text-xl text-gray-600">
              The KAKVERA Global advantage in every transaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentiators.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-700 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Certifications & Awards */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trusted & Certified
            </h2>
            <p className="text-xl text-blue-100">
              Official certifications and industry recognition
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <Award className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">CAC Registered</h3>
              <p className="text-blue-100 text-sm">RC: 2342761</p>
            </div>
            <div className="text-center">
              <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Customs Licensed</h3>
              <p className="text-blue-100 text-sm">Authorized Customs Agent</p>
            </div>
            <div className="text-center">
              <Globe className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">IATA Certified</h3>
              <p className="text-blue-100 text-sm">International Air Transport</p>
            </div>
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">ISO Compliant</h3>
              <p className="text-blue-100 text-sm">Quality Management</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;