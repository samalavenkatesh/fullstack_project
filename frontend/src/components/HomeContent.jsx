import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { GiWheat } from 'react-icons/gi';
import { TiShoppingCart } from 'react-icons/ti';
import { MdDashboardCustomize } from 'react-icons/md';
import { TfiArrowCircleRight } from 'react-icons/tfi';
import LandingPage from './LandingPage'; // Show landing page for not logged-in users

function HomeContent() {
  const navigate = useNavigate();
  const { type, loggedIn ,loggedInUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate('/Login');
    }, 1000);
  };

  const FarmerContent = (
    <div className="max-w-screen-2xl md:p-16 mt-16 flex flex-col md:flex-row justify-center">
      <div className="flex flex-col md:flex-row mb-5">
        <div className="md:w-72 w-60 md:m-16 mx-auto mt-10 p-5 rounded-md hover:cursor-pointer hover:z-20 hover:shadow-2xl bg-[#e2e243]">
          <Link to="/Farmer">
            <h1 className="flex md:text-2xl text-xl font-bold justify-center p-2 border-b-2">Sell</h1>
            <p className="flex justify-center m-5">
              <GiWheat size={60} />
            </p>
            <p className="justify-center text-center m-5 font-semibold">Sell your crops here</p>
            <span className="flex justify-center hover:scale-110">
              <TfiArrowCircleRight size={24} />
            </span>
          </Link>
        </div>
        <div className="md:w-72 w-60 md:m-16 mx-auto mt-10 p-5 rounded-md hover:cursor-pointer hover:z-20 hover:shadow-2xl bg-slate-400">
          <Link to="/FarmerDashboard">
            <h1 className="flex md:text-2xl text-xl font-bold justify-center p-2 border-b-2">Dashboard</h1>
            <p className="flex justify-center m-5">
              <MdDashboardCustomize size={60} />
            </p>
            <p className="justify-center text-center m-5 font-semibold">See Your details</p>
            <span className="flex justify-center hover:scale-110">
              <TfiArrowCircleRight size={24} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );

  const RetailerContent = (
    <div className="max-w-screen-2xl md:p-16 mt-16 flex flex-col md:flex-row justify-center">
      <div className="flex flex-col md:flex-row mb-5">
        <div className="md:w-72 w-60 md:m-16 mx-auto mt-10 p-5 rounded-md hover:cursor-pointer hover:z-20 hover:shadow-2xl bg-[#4fe3d2]">
          <Link to="/Buyer">
            <h1 className="flex md:text-2xl text-xl font-bold justify-center p-2 border-b-2">Shop</h1>
            <p className="flex justify-center m-5">
              <TiShoppingCart size={60} />
            </p>
            <p className="justify-center text-center m-5 font-semibold">Buy from farmers</p>
            <span className="flex justify-center hover:scale-110">
              <TfiArrowCircleRight size={24} />
            </span>
          </Link>
        </div>
        <div className="md:w-72 w-60 md:m-16 mx-auto mt-10 p-5 rounded-md hover:cursor-pointer hover:z-20 hover:shadow-2xl bg-slate-400">
          <Link to="/BuyerDashboard">
            <h1 className="flex md:text-2xl text-xl font-bold justify-center p-2 border-b-2">Dashboard</h1>
            <p className="flex justify-center m-5">
              <MdDashboardCustomize size={60} />
            </p>
            <p className="justify-center text-center m-5 font-semibold">See Your details</p>
            <span className="flex justify-center hover:scale-110">
              <TfiArrowCircleRight size={24} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );

//   return (
//     <>
//       {loggedIn ? (type === 'Farmer' ? <div className='h-screen'> {FarmerContent} </div>  : <div className='h-screen'> {RetailerContent} </div> ) : <LandingPage />}
//     </>
//   );
return (
    <>
      {/* <header className="bg-blue-600 text-white p-4 flex justify-between items-center mt-16">
        <h1 className="text-2xl font-bold">Farmer & Retailer Hub</h1>
        {loggedIn && (
          <div className="flex items-center">
            <span className="mr-2">Welcome, {loggedInUser.name}!</span>
            <img src={loggedInUser.profilePicture} alt="Profile" className="w-8 h-8 rounded-full" />
          </div>
        )}
      </header> */}
      <div className="relative bg-gradient-to-r from-green-200 to-yellow-100">
        {loggedIn ? (
          type === 'Farmer' ? (
            <div className='h-screen'>
              {FarmerContent}
            </div>
          ) : (
            <div className='h-screen'>
              {RetailerContent}
            </div>
          )
        ) : (
          <LandingPage />
        )}
      </div>
      {loggedIn && (
        <div className="fixed bottom-5 right-5">
          <button className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600">
            <span className="font-bold">Help</span>
          </button>
        </div>
      )}
    </>
  );
}

export default HomeContent;
