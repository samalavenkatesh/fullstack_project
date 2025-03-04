import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './components/NavBar';
import HomeContent from './components/HomeContent';
import Footer from './components/Footer';
import Farmer from './components/Farmer';
import Buyer from './components/Buyer';
import Contacts from './components/Contacts';
import Register from './components/Register';
import Login from './components/Login';
import FarmerDashboard from './components/FarmerDashboard';
import BuyerDashboard from './components/BuyerDashboard';
import NotFound from './components/NotFound';
import ServicesPage from './components/ServicesPage';
import Profile from './components/Profile';
import ProductDetails from './components/ProductDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <NavBar />
        <HomeContent />
        <Footer />
      </div>
    ),
  },
  {
    path: '/Profile',
    element: (
      <div>
        <NavBar />
        <Profile/>
        <Footer />
      </div>
    ),
  },
  {
    path: '/Product/:productId',
    element: (
      <div>
        <NavBar />
        <ProductDetails/>
        <Footer />
      </div>
    ),
  },
  {
    path: '/Farmer',
    element: (
      <div>
        <NavBar />
        <Farmer />
        <Footer />
      </div>
    ),
  },
  {
    path: '/Buyer',
    element: (
      <div>
        <NavBar />
        <Buyer />
        <Footer />
      </div>
    ),
  },
  {
    path: '/Services',
    element: (
      <div>
        <NavBar />
        <ServicesPage/>
        <Footer />
      </div>
    ),
  },
  {
    path: '/Contacts',
    element: (
      <div>
        <NavBar />
        <Contacts />
        <Footer />
      </div>
    ),
  },
  {
    path: '/Login',
    element: (
      <div>
        <NavBar />
        <Login />
        <Footer />
      </div>
    ),
  },
  {
    path: '/Register',
    element: (
      <div>
        <NavBar />
        <Register />
        <Footer />
      </div>
    ),
  },
  {
    path: '/FarmerDashboard',
    element: (
      <div>
        <NavBar />
        <FarmerDashboard />
        <Footer />
      </div>
    ),
  },
  {
    path: '/BuyerDashboard',
    element: (
      <div>
        <NavBar />
        <BuyerDashboard />
        <Footer />
      </div>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
