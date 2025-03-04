import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowDown } from "react-icons/ai";

function LandingPage() {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-500 to-teal-500 h-screen text-white flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Welcome to <span className="text-gray-700">Farm</span><span className="text-yellow-400">MART</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          A revolutionary platform connecting farmers with buyers for fresh, affordable, and organic produce.
        </p>
        <Link to="/Register" className="bg-white text-green-500 hover:bg-green-100 font-semibold py-3 px-8 rounded-lg text-xl transition duration-300">
          Get Started
        </Link>
        <div className="absolute bottom-10 animate-bounce">
          <AiOutlineArrowDown size={30} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-6">What is FarmMart?</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          FarmMart is an online platform designed to help farmers sell their produce directly to buyers. By eliminating middlemen, we ensure that farmers earn better profits while buyers enjoy fresh, high-quality produce at affordable prices.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-4xl text-green-500 mb-4">🌱</div>
            <h3 className="text-xl font-semibold mb-4">Fresh Produce</h3>
            <p className="text-gray-700">
              Our farmers grow organic, fresh produce that is delivered directly to you, ensuring the highest quality.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-4xl text-yellow-500 mb-4">💰</div>
            <h3 className="text-xl font-semibold mb-4">Affordable Prices</h3>
            <p className="text-gray-700">
              We cut out the middlemen, offering buyers fresh produce at competitive prices while ensuring fair earnings for farmers.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div className="text-4xl text-teal-500 mb-4">🌍</div>
            <h3 className="text-xl font-semibold mb-4">Wide Range of Products</h3>
            <p className="text-gray-700">
              From fruits and vegetables to grains and seeds, our platform offers a wide range of products directly from farmers.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 px-6">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="text-4xl text-green-500 mb-4">1️⃣</div>
            <h3 className="text-xl font-semibold mb-4">Sign Up</h3>
            <p className="text-gray-700">Create an account to either list your products or start shopping for fresh produce.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="text-4xl text-yellow-500 mb-4">2️⃣</div>
            <h3 className="text-xl font-semibold mb-4">Browse Products</h3>
            <p className="text-gray-700">Browse the wide range of fresh products listed by farmers across the country.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="text-4xl text-teal-500 mb-4">3️⃣</div>
            <h3 className="text-xl font-semibold mb-4">Buy or Sell</h3>
            <p className="text-gray-700">Make transactions directly with farmers or buyers for fresh, organic produce.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Join FarmMart?</h2>
        <p className="text-lg mb-6">Sign up today and start buying or selling fresh produce directly from farmers!</p>
        <Link
          to="/Register"
          className="bg-white text-green-500 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg text-xl transition duration-300"
        >
          Get Started Now
        </Link>
      </section>

    </div>
  );
}

export default LandingPage;
