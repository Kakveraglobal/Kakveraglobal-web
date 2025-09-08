import React from 'react';
import { Shield, Eye, Lock, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              How we collect, use, and protect your personal information
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-8">
              <Shield className="h-8 w-8 text-blue-700 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Your Privacy Matters</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8 leading-relaxed">
                At KAKVERA GLOBAL SERVICES ("we," "our," or "us"), we are committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                or use our services.
              </p>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center mb-4">
                    <Eye className="h-6 w-6 text-blue-700 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Information We Collect</h3>
                  </div>
                  <div className="pl-8">
                    <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1 mb-4">
                      <li>Name, email address, phone number</li>
                      <li>Business information and trade requirements</li>
                      <li>Shipping addresses and delivery preferences</li>
                      <li>Payment information for our services</li>
                    </ul>
                    
                    <h4 className="font-semibold text-gray-900 mb-2">Business Information</h4>
                    <ul className="list-disc pl-6 text-gray-600 space-y-1">
                      <li>Company registration details</li>
                      <li>Import/export documentation</li>
                      <li>Trade history and preferences</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center mb-4">
                    <UserCheck className="h-6 w-6 text-blue-700 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">How We Use Your Information</h3>
                  </div>
                  <div className="pl-8">
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>To provide and maintain our import/export services</li>
                      <li>To process your trade requests and quotes</li>
                      <li>To communicate with you about your shipments and services</li>
                      <li>To comply with customs and regulatory requirements</li>
                      <li>To improve our services and customer experience</li>
                      <li>To send you relevant trade updates and opportunities (with your consent)</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center mb-4">
                    <Lock className="h-6 w-6 text-blue-700 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">Information Protection</h3>
                  </div>
                  <div className="pl-8">
                    <p className="text-gray-600 mb-4">
                      We implement appropriate technical and organizational security measures to protect your personal information against 
                      unauthorized access, alteration, disclosure, or destruction.
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Encrypted data transmission and storage</li>
                      <li>Regular security assessments and updates</li>
                      <li>Limited access to personal information on a need-to-know basis</li>
                      <li>Secure payment processing through trusted providers</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Information Sharing</h3>
                  <div className="pl-8">
                    <p className="text-gray-600 mb-4">
                      We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>With your explicit consent</li>
                      <li>To trusted service providers who assist in our operations (shipping companies, customs agents)</li>
                      <li>When required by law or to comply with legal proceedings</li>
                      <li>To protect our rights, property, or safety, or that of our users</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h3>
                  <div className="pl-8">
                    <p className="text-gray-600 mb-4">You have the right to:</p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Access and review your personal information</li>
                      <li>Request corrections to inaccurate information</li>
                      <li>Request deletion of your personal information (subject to legal requirements)</li>
                      <li>Opt out of marketing communications</li>
                      <li>File a complaint with relevant data protection authorities</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
                  <div className="pl-8">
                    <p className="text-gray-600 mb-4">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">
                        <strong>KAKVERA GLOBAL SERVICES</strong><br />
                        Email: <a href="mailto:info@kakveraglobal.com" className="text-blue-700">info@kakveraglobal.com</a><br />
                        Phone: <a href="tel:+2348162777605" className="text-blue-700">+234 816 277 7605</a><br />
                        Address: 14, Blueroof Avenue, off Lasu-Isheri Road, Lagos, Nigeria
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Updates to This Policy</h3>
                  <div className="pl-8">
                    <p className="text-gray-600">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
                      Privacy Policy on this page with an updated effective date. You are advised to review this Privacy Policy 
                      periodically for any changes.
                    </p>
                  </div>
                </section>

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Last Updated: January 2025<br />
                    Effective Date: January 1, 2025<br />
                    RC: 2342761
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;