import React from 'react';

export default function AboutContact() {
  return (
    <div>
      {/* About Section */}
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl text-center">
          <h1 className="text-6xl font-bold text-yellow-500 mb-6 animate-fade-in">
            About Us
          </h1>
          <p className="text-xl text-gray-700 mb-8 animate-fade-in delay-100">
            We are dedicated to creating a seamless experience for our clients. Your feedback helps us grow and improve.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 hover:bg-blue-300 delay-100 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700">
                To provide exceptional service and continuously improve based on your valuable feedback.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg hover:bg-blue-300 delay-100 shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700">
                To be the most trusted platform for client feedback and engagement.
              </p>
            </div>
          </div>
          <div className="mt-12 bg-white px-8 py-10 hover:bg-blue-300 delay-100 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-gray-700">
              Transparency, innovation, and customer-centricity drive everything we do. We believe in fostering a collaborative environment where feedback fuels growth and excellence.
            </p>
          </div>
        </div>
      </div>
      

    </div>
  );
}
