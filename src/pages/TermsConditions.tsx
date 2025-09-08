import React from 'react';
import { FileText, Scale, Shield, AlertTriangle } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Terms & Conditions</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Terms governing the use of our services and website
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-8">
              <FileText className="h-8 w-8 text-blue-700 mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-8 leading-relaxed">
                These Terms and Conditions ("Terms") govern your use of the website and services provided by 
                KAKVERA GLOBAL SERVICES, a company registered in Nigeria with RC Number 2342761. 
                By accessing our website or using our services, you agree to be bound by these Terms.
              </p>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center mb-4">
                    <Scale className="h-6 w-6 text-blue-700 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">1. Acceptance of Terms</h3>
                  </div>
                  <div className="pl-8">
                    <p className="text-gray-600 mb-4">
                      By using our website and services, you acknowledge that you have read, understood, and agree to be bound 
                      by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use our services.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Company Information</h3>
                  <div className="pl-8 bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Company Name:</strong> KAKVERA GLOBAL SERVICES<br />
                      <strong>Registration Number:</strong> RC 2342761<br />
                      <strong>Registered Address:</strong> 14, Blueroof Avenue, off Lasu-Isheri Road, Lagos, Nigeria<br />
                      <strong>Contact Email:</strong> info@kakveraglobal.com<br />
                      <strong>Phone:</strong> +234 816 277 7605
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Services Provided</h3>
                  <div className="pl-8">
                    <p className="text-gray-600 mb-4">
                      KAKVERA GLOBAL SERVICES provides international trade and logistics services including:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Product sourcing and supplier verification</li>
                      <li>Import and export logistics</li>
                      <li>Customs clearance and compliance</li>
                      <li>Freight forwarding and shipping coordination</li>
                      <li>Trade consultation and support services</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center mb-4">
                    <Shield className="h-6 w-6 text-blue-700 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">4. Client Responsibilities</h3>
                  </div>
                  <div className="pl-8">
                    <h4 className="font-semibold text-gray-900 mb-2">You agree to:</h4>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                      <li>Provide accurate and complete information for all transactions</li>
                      <li>Comply with all applicable laws and regulations</li>
                      <li>Pay all agreed fees and charges promptly</li>
                      <li>Provide necessary documentation in a timely manner</li>
                      <li>Inspect goods upon delivery and report any issues immediately</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">5. Payment Terms</h3>
                  <div className="pl-8">
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>Payment terms will be specified in individual service agreements</li>
                      <li>All fees are subject to applicable taxes</li>
                      <li>Late payment may result in service suspension and additional charges</li>
                      <li>Refunds are subject to our refund policy and individual circumstances</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <div className="flex items-center mb-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-600 mr-2" />
                    <h3 className="text-xl font-semibold text-gray-900">6. Limitations of Liability</h3>
                  </div>
                  <div className="pl-8">
                    <p className="text-gray-600 mb-4">
                      While we strive to provide excellent service, our liability is limited to:
                    </p>
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>The value of services provided for the specific transaction</li>
                      <li>We are not liable for delays caused by customs authorities, natural disasters, or force majeure events</li>
                      <li>Clients are responsible for verifying product specifications and quality upon receipt</li>
                      <li>We recommend appropriate insurance coverage for high-value shipments</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">7. Customs and Regulatory Compliance</h3>
                  <div className="pl-8">
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>We assist with customs procedures but ultimate responsibility for compliance rests with the importer</li>
                      <li>Additional charges may apply for non-standard documentation or regulatory requirements</li>
                      <li>Prohibited or restricted items will not be processed</li>
                      <li>Clients must provide accurate product descriptions and values</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">8. Intellectual Property</h3>
                  <div className="pl-8">
                    <p className="text-gray-600">
                      All content on our website, including text, graphics, logos, and images, is the property of 
                      KAKVERA GLOBAL SERVICES and is protected by intellectual property laws. Unauthorized use is prohibited.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">9. Dispute Resolution</h3>
                  <div className="pl-8">
                    <ul className="list-disc pl-6 text-gray-600 space-y-2">
                      <li>All disputes will first be addressed through good faith negotiation</li>
                      <li>Unresolved disputes will be subject to arbitration under Nigerian law</li>
                      <li>The courts of Lagos State, Nigeria will have exclusive jurisdiction</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">10. Termination</h3>
                  <div className="pl-8">
                    <p className="text-gray-600">
                      We reserve the right to terminate or suspend services for violation of these Terms, 
                      non-payment, or other legitimate business reasons. Ongoing shipments will be completed 
                      according to existing agreements.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">11. Changes to Terms</h3>
                  <div className="pl-8">
                    <p className="text-gray-600">
                      We may modify these Terms at any time. Changes will be posted on our website with an 
                      updated effective date. Continued use of our services constitutes acceptance of modified Terms.
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">12. Contact Information</h3>
                  <div className="pl-8">
                    <p className="text-gray-600 mb-4">
                      For questions about these Terms & Conditions, please contact us:
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

                <div className="mt-12 pt-8 border-t border-gray-200">
                  <p className="text-sm text-gray-500 text-center">
                    Last Updated: January 2025<br />
                    Effective Date: January 1, 2025<br />
                    KAKVERA GLOBAL SERVICES - RC: 2342761
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

export default TermsConditions;