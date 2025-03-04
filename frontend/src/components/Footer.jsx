import React from 'react'; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white py-12 w-full  mt-auto ">
        <div className="max-w-screen-2xl container mx-auto px-4 md:px-20">
          <div className="flex flex-col items-center justify-center">
            
            {/* Social Media Links */}
            <div className="flex space-x-6 text-2xl mb-8">
              <a href="https://facebook.com" className="hover:text-blue-600 transition duration-300">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-400 transition duration-300">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="hover:text-pink-500 transition duration-300">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="hover:text-blue-700 transition duration-300">
                <FaLinkedin />
              </a>
            </div>

            {/* Divider */}
            <div className="mt-8 border-t border-gray-600 pt-8 w-full flex flex-col items-center">
              
              {/* Footer Text */}
              <p className="text-sm mb-2">
                &copy; 2024 <span className="text-gray-400 font-semibold">Farm<span className='text-yellow-400'>Mart</span></span> . All rights reserved.
              </p>
              <p className="text-sm">
                Made With ❤️ by <span className="text-gray-400 font-semibold">Team Farm<span className='text-yellow-400'>Mart</span></span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
