import React from 'react';

export default function Home() {
  
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-50 flex flex-col items-center justify-center p-8">
        <div className="max-w-4xl text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Welcome to <span className="text-yellow-500"> DC Infotech </span> Feedback Portal
          </h1>
          <p className="text-xl text-gray-700 mb-8 animate-fade-in delay-100">
            Share your thoughts and help us improve. Your feedback matters!
          </p>
          <div className="flex space-x-4 justify-center">
            <a
              href="/login"
              className="bg-yellow-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 transition-transform duration-300"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="bg-blue-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-600 hover:scale-105 transition-transform duration-300"
            >
              Know more
            </a>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-blue-400 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-4">Why Your Feedback Matters</h2>
          <p className="text-lg text-gray-800 mb-8">
            At DC Infotech, we believe in continuous improvement. Your feedback helps us refine our services, enhance customer
            satisfaction, and create better user experiences. Let’s build something great together!
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  ">
            <div className="bg-white shadow-xl rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <img
                src="innov.avif"
                alt="Improvement"
                className="rounded-md mb-4 w-full h-40 object-cover "
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 ">Innovative Solutions</h3>
              <p className="text-gray-600 animate-fade-in delay-100">Your feedback drives new features and improvements that benefit everyone.</p>
            </div>
            <div className="bg-white shadow-xl rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <img
                src="Collab-cuate.png"
                alt="Collaboration"
                className="rounded-md mb-4 w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Collaborative Growth</h3>
              <p className="text-gray-600">Working together, we enhance the user experience with every suggestion you provide.</p>
            </div>
            <div className="bg-white shadow-xl rounded-lg p-6 hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <img
                src="effi.png"
                alt="Efficiency"
                className="rounded-md mb-4 w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Increased Efficiency</h3>
              <p className="text-gray-600">Your feedback helps us optimize our processes and deliver results faster.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-50 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-900 mb-8">How It Works</h2>
          <p className="text-lg text-gray-600 mb-8">
            Providing feedback is simple and quick. Follow these easy steps to share your thoughts with us:
          </p>
          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl">
                1
              </div>
              <p className="text-lg text-gray-700">Sign up or log in to the portal to give us feedback.</p>
              <img className="w-16 h-16" src="login.gif" alt='' />
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl">
                2
              </div>
              <p className="text-lg text-gray-700">Fill out the feedback form  according to your suggestions. </p>
              <img className="w-14 h-14" src="feedback.gif" alt='' />
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xl">
                3
              </div>
              <p className="text-lg text-gray-700">Submit your feedback, and we’ll get to work on it!</p>
              <img className="w-14 h-14" src="rocket.gif" alt='' />
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-blue-600  py-8 w-full">
        <div className=" text-center">
          <p className="text-lg">© 2025 DC Infotech. All rights reserved.</p>
          <p className="text-sm mt-4">
            <a href="/" className="text-yellow-500 hover:underline">Privacy Policy</a> | 
            <a href="/" className="text-yellow-500 hover:underline"> Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
