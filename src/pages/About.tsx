import React from 'react';
import { Calendar, MapPin, Users, Target, Eye, Award, Shield, Clock } from 'lucide-react';

const About = () => {

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">About KAKVERA Global Services</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              A decade of excellence in international trade, connecting Nigeria with global opportunities
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded in 2015, KAKVERA Global Services emerged from a vision to bridge the gap between 
                Nigerian businesses and the global marketplace. We recognized the challenges faced by 
                local entrepreneurs in accessing international products and suppliers.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Over the past decade, we've built a network of trusted global partners and developed 
                streamlined processes that make international trade accessible, reliable, and profitable 
                for our clients.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-blue-700" />
                  <div>
                    <div className="font-semibold text-gray-900">Founded</div>
                    <div className="text-gray-600">2015</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-blue-700" />
                  <div>
                    <div className="font-semibold text-gray-900">Headquarters</div>
                    <div className="text-gray-600">Lagos, Nigeria</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-blue-700" />
                  <div>
                    <div className="font-semibold text-gray-900">RC Number</div>
                    <div className="text-gray-600">2342761</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-blue-700" />
                  <div>
                    <div className="font-semibold text-gray-900">Team Size</div>
                    <div className="text-gray-600">25+ Professionals</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/8728386/pexels-photo-8728386.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Modern office building representing KAKVERA Global Services headquarters"
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Target className="h-12 w-12 text-blue-700 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To democratize international trade by providing Nigerian businesses and individuals 
                with seamless access to global markets, ensuring quality, compliance, and reliability 
                in every transaction.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <Eye className="h-12 w-12 text-blue-700 mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become West Africa's premier international trade facilitator, empowering economic 
                growth through strategic global partnerships and innovative logistics solutions.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Values Section */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-blue-100">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Shield className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trust & Transparency</h3>
              <p className="text-blue-100 leading-relaxed">
                Building lasting relationships through honest communication and reliable service delivery
              </p>
            </div>
            <div className="text-center">
              <Clock className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Speed & Efficiency</h3>
              <p className="text-blue-100 leading-relaxed">
                Optimizing every process to deliver faster clearance times and reduced costs
              </p>
            </div>
            <div className="text-center">
              <Target className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence & Quality</h3>
              <p className="text-blue-100 leading-relaxed">
                Maintaining the highest standards in supplier verification and service delivery
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;