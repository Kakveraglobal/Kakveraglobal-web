import React from 'react';
import { Shirt, Stethoscope, Smartphone, Hammer, Bike, Cog, ArrowRight, Star } from 'lucide-react';

const Industries = () => {
  const currentIndustry = {
    title: "Fashion & Apparel",
    description: "Our flagship specialty with deep expertise in sourcing quality fashion items from global markets",
    icon: Shirt,
    details: [
      "Premium clothing and accessories",
      "Footwear and leather goods",
      "Textile materials and fabrics",
      "Fashion accessories and jewelry",
      "Luxury brand partnerships",
      "Quality assurance and authenticity verification"
    ],
    stats: [
      { label: "Fashion Imports", value: "5,000+" },
      { label: "Brand Partners", value: "200+" },
      { label: "Satisfied Customers", value: "2,500+" }
    ]
  };

  const futureIndustries = [
    {
      title: "Medical Equipment",
      description: "High-quality medical devices and equipment for healthcare facilities",
      icon: Stethoscope,
      timeline: "Expanding Q2 2025"
    },
    {
      title: "Electronics & Technology",
      description: "Consumer electronics, smartphones, and tech accessories",
      icon: Smartphone,
      timeline: "Expanding Q3 2025"
    },
    {
      title: "Building Materials",
      description: "Construction materials and architectural supplies",
      icon: Hammer,
      timeline: "Expanding Q4 2025"
    },
    {
      title: "Bicycles & Sports",
      description: "Bicycles, sports equipment, and fitness accessories",
      icon: Bike,
      timeline: "Expanding Q1 2026"
    },
    {
      title: "Manufacturing Inputs",
      description: "Raw materials and components for manufacturing",
      icon: Cog,
      timeline: "Expanding Q2 2026"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Industries We Serve</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Specialized expertise across diverse industries, with plans for strategic expansion
            </p>
          </div>
        </div>
      </section>

      {/* Current Industry Focus */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-2" />
              Current Specialty
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {currentIndustry.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentIndustry.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <currentIndustry.icon className="h-16 w-16 text-blue-700 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Import</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {currentIndustry.details.map((detail, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700">{detail}</span>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                {currentIndustry.stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Fashion and apparel logistics operations"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Future Expansions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Future Expansion Plans
            </h2>
            <p className="text-xl text-gray-600">
              Strategic growth into high-demand sectors across Nigeria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {futureIndustries.map((industry, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <industry.icon className="h-12 w-12 text-blue-700 mb-4" />
                <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium mb-3">
                  {industry.timeline}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {industry.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {industry.description}
                </p>
                <div className="flex items-center text-blue-700 font-medium text-sm">
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Industry Expertise */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/7651933/pexels-photo-7651933.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="International trade operations and logistics expertise"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Industry-Specific Expertise
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our deep understanding of industry-specific requirements, regulations, and market dynamics 
                ensures that your imports meet all necessary standards and arrive in perfect condition.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Regulatory Compliance</h4>
                    <p className="text-gray-600">Full knowledge of industry-specific regulations and requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Standards</h4>
                    <p className="text-gray-600">Ensuring products meet Nigerian and international quality standards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Market Knowledge</h4>
                    <p className="text-gray-600">Understanding of local market demands and preferences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Looking to Import in Your Industry?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether it's our current specialty or future expansion area, we're here to help you succeed
          </p>
          <a
            href="mailto:trade@kakveraglobal.com"
            className="inline-flex items-center px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
          >
            Discuss Your Industry Needs
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default Industries;