import React from 'react';
import { Package, Ship, CheckCircle, Globe, Truck, FileText, Phone, Shield } from 'lucide-react';

const Services = () => {
  const mainServices = [
    {
      title: "Product Sourcing & Supplier Verification",
      description: "We help you find and verify reliable suppliers worldwide, ensuring quality and authenticity of products before purchase.",
      icon: Globe,
      features: ["Supplier background verification", "Quality assessment", "Price negotiation", "Sample procurement"]
    },
    {
      title: "Freight Forwarding & Shipping",
      description: "Comprehensive shipping solutions from any global location to Nigeria with full tracking and insurance coverage.",
      icon: Ship,
      features: ["Sea and air freight", "Cargo insurance", "Real-time tracking", "Consolidated shipping"]
    },
    {
      title: "Customs Clearance & Compliance",
      description: "Expert handling of all customs procedures ensuring fast clearance and full regulatory compliance.",
      icon: FileText,
      features: ["Documentation preparation", "Duty calculation", "Regulatory compliance", "Fast-track processing"]
    },
    {
      title: "Import Logistics Management",
      description: "End-to-end logistics coordination from purchase to delivery at your doorstep in Nigeria.",
      icon: Truck,
      features: ["Door-to-door delivery", "Warehouse storage", "Last-mile delivery", "Inventory management"]
    }
  ];

  const additionalServices = [
    {
      title: "Export Services",
      description: "Help Nigerian businesses reach global markets",
      icon: Package
    },
    {
      title: "Trade Consultation",
      description: "Expert advice on international trade regulations",
      icon: Shield
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer support and tracking",
      icon: Phone
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive international trade solutions designed to make global commerce accessible to Nigerian businesses
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Core Services
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for successful international trade
            </p>
          </div>

          <div className="space-y-16">
            {mainServices.map((service, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <service.icon className="h-16 w-16 text-blue-700 mb-6" />
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <img
                    src={`https://images.pexels.com/photos/${
                      index === 0 ? '4246120' : 
                      index === 1 ? '4246083' : 
                      index === 2 ? '8728380' : 
                      '4246119'
                    }/pexels-photo-${
                      index === 0 ? '4246120' : 
                      index === 1 ? '4246083' : 
                      index === 2 ? '8728380' : 
                      '4246119'
                    }.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`}
                    alt={`${service.title} visualization`}
                    className="rounded-lg shadow-xl w-full h-80 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Supporting services to enhance your trading experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <service.icon className="h-12 w-12 text-blue-700 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <p className="text-xl text-gray-600">
              Our streamlined process ensures smooth transactions from start to finish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Consultation", description: "Discuss your requirements and get personalized recommendations" },
              { step: "2", title: "Sourcing", description: "Find verified suppliers and negotiate the best terms" },
              { step: "3", title: "Shipping", description: "Handle freight forwarding and documentation" },
              { step: "4", title: "Delivery", description: "Clear customs and deliver to your location" }
            ].map((process, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {process.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {process.description}
                </p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-blue-300 transform -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your import and export needs with our expert team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+2348162777605"
              className="inline-flex items-center px-8 py-3 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us Now
            </a>
            <a
              href="mailto:info@kakveraglobal.com"
              className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-all duration-300"
            >
              Send Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;