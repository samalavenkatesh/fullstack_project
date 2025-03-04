import React, { useContext, useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const NavBar = () => {
  const { loggedIn, loggedInUser, logout, type, menu, setMenu } = useContext(AuthContext);

  const [navItems, setNavItems] = useState([]);

  // Define all navigation items
  const allNavItems = [
    { id: 0, text: "Home", url: "/" },
    { id: 1, text: "Services", url: "/Services" }, // Always shown
    { id: 2, text: "Sell", url: "/Farmer", showFor: ["Farmer"] }, // Only for logged-in farmers
    { id: 3, text: "Shop", url: "/Buyer", showFor: ["Retailer"] }, // Only for logged-in retailers
    { id: 4, text: "Dashboard", url: "/FarmerDashboard", showFor: ["Farmer"] },
    { id: 5, text: "Dashboard", url: "/BuyerDashboard", showFor: ["Retailer"] },
    { id: 6, text: "Contacts", url: "/Contacts" }, // Always shown
  ];

  useEffect(() => {
    if (loggedIn) {
      // Include "Services" and filter items based on user type
      const filteredNavItems = allNavItems.filter(
        (item) => item.text === "Services" || !item.showFor || item.showFor.includes(type)
      );
      setNavItems(filteredNavItems);
    } else {
      // When not logged in, include only general items like "Home", "Services", and "Contacts"
      const filteredNavItems = allNavItems.filter(
        (item) => item.text === "Home" || item.text === "Services" || item.text === "Contacts"
      );
      setNavItems(filteredNavItems);
    }
  }, [type, loggedIn]);

  return (
    <header className="bg-white shadow-lg fixed left-0 top-0 right-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center p-5">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <h1 className="font-extrabold text-2xl text-green-600">
            Farm<span className="text-yellow-400">MART</span>
          </h1>
          <p className="text-sm text-gray-600">By Farmer Hands</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-12 text-lg">
          {navItems.map(({ id, text, url }) => (
            <NavLink
              key={id}
              to={url}
              className="text-gray-700 hover:text-green-600 font-semibold transition duration-300"
              activeClassName="text-green-500"
            >
              {text}
            </NavLink>
          ))}
        </nav>

        {/* Authentication Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {loggedIn ? (
            <>
              {loggedInUser && <span className="text-gray-700">{loggedInUser}</span>}
              <button
                onClick={logout}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/Register"
                className="px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-100 transition duration-300"
              >
                Join
              </Link>
              <span>|</span>
              <Link
                to="/Login"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenu(!menu)}
          className="md:hidden p-2 rounded-md bg-white shadow-md transition duration-300"
          aria-expanded={menu}
        >
          {menu ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menu && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-white z-40 transition-transform duration-300 transform translate-x-0">
          <div className="flex flex-col items-center py-10 space-y-6">
            {navItems.map(({ id, text, url }) => (
              <NavLink
                key={id}
                to={url}
                className="text-xl text-gray-700 py-2 hover:text-green-600"
                onClick={() => setMenu(false)}
              >
                {text}
              </NavLink>
            ))}
            {!loggedIn && (
              <div className="flex flex-col items-center space-y-4 mt-6">
                <Link
                  to="/Register"
                  className="px-4 py-2 border border-green-500 text-green-500 rounded-md"
                  onClick={() => setMenu(false)}
                >
                  Join
                </Link>
                <Link
                  to="/Login"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={() => setMenu(false)}
                >
                  Login
                </Link>
              </div>
            )}
            {loggedIn && (
              <button
                onClick={logout}
                className="px-4 py-2 bg-green-500 text-white rounded-md mt-4"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
