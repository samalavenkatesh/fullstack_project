import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaTruck, FaHandsHelping, FaUsers } from "react-icons/fa"; // Example icons
import { AuthContext } from "./AuthContext";

function ServicesPage() {

    const { loggedIn, loggedInUser, logout, type, menu, setMenu } = useContext(AuthContext);
    const [newtype,setNewType] = useState("");
    // console.log(type);

    useEffect(() => {
        if(type=="Retailer"){
            setNewType("Buyer");
        } 
        else{
            setNewType(type);
        }

    }, [])
    

  return (
    <div className="bg-gray-50 mt-16 mb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-teal-500 h-72 text-white flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-4xl font-extrabold mb-4">Our Services</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Discover the range of services we offer to connect farmers with buyers and enhance their experience.
        </p>
        <Link
          to={loggedIn? "/" : "/Register" }
          className="bg-white text-blue-500 hover:bg-blue-100 font-semibold py-3 px-8 rounded-lg text-xl transition duration-300"
        >
          Get Started
        </Link>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8 ">What We Offer</h2>
        <div className="justify-center flex flex-col md:flex-row gap-5 mx-10 p-10">
        {/* <div className="justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-6"> */}

          {/* Service 1: Fresh Produce */}
          <div className="w-full bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <FaLeaf className="text-4xl text-green-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Fresh Produce</h3>
            <p className="text-gray-700">
              We connect buyers with local farmers who grow fresh, organic produce. No middlemen involved!
            </p>
            <Link
              to={loggedIn? `/${newtype}` : "/Register"}
              className="p-2 text-green-500 mt-4 block hover:underline"
            >
              View
            </Link>
          </div>

          {/* Service 2: Easy Shipping */}
          {/* <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <FaTruck className="text-4xl text-yellow-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Easy Shipping</h3>
            <p className="text-gray-700">
              We offer easy and reliable shipping options to ensure that your produce reaches you on time and fresh.
            </p>
            <Link
              to="/Buyer"
              className="text-green-500 mt-4 block hover:underline"
            >
              Learn More
            </Link>
          </div> */}

          {/* Service 2: Support for Farmers */}
          <div className="w-full bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <FaHandsHelping className="text-4xl text-teal-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Support for Farmers</h3>
            <p className="text-gray-700">
              We provide resources, training, and support to farmers, helping them improve crop yields and profits.
            </p>
            <Link
              to={loggedIn? `/${newtype}Dashboard` : '/Register'}
              className="p-2 text-green-500 mt-4 block hover:underline"
            >
              View
            </Link>
          </div>

          {/* Service 3: Support for buyers */}
          <div className="w-full bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <FaTruck className="text-4xl text-teal-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Support for Buyers</h3>
            <p className="text-gray-700">
              We provide resources to get fresh crops and produces by farmer hands .
            </p>
            <Link
              to={loggedIn?  `/${newtype}Dashboard` : '/Register'}
              className="pt-8 text-green-500 mt-4 block hover:underline"
            >
              View
            </Link>
          </div>

          {/* Service 4: Community Building */}
          <div className="w-full bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300">
            <FaUsers className="text-4xl text-orange-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4">Community Building</h3>
            <p className="text-gray-700">
              Join a vibrant community of farmers and buyers, exchange knowledge, and grow together.
            </p>
            <Link
              to="/Contacts"
              className="p-2 text-green-500 mt-4 block hover:underline"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      {/* <section className="bg-green-500 text-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-lg mb-6">
          Join FarmMart today to access our full range of services and connect directly with farmers and buyers.
        </p>
        <Link
          to="/Register"
          className="bg-white text-green-500 hover:bg-green-100 font-semibold py-3 px-8 rounded-lg text-xl transition duration-300"
        >
          Sign Up Now
        </Link>
      </section> */}
    </div>
  );
}

export default ServicesPage;
