import React, { useContext, useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const NavBar2 = () => {
  const { loggedIn, loggedInUser, logout, type, menu, setMenu } = useContext(AuthContext);

  const [navItems, setNavItems] = useState([]);

  // Define all navigation items
  const allNavItems = [
    { id: 0, text: "Home", url: "/" },
    { id: 1, text: "Shop", url: "/Buyer", showFor: ["Retailer"] },
    { id: 2, text: "Sell", url: "/Farmer", showFor: ["Farmer"] },
    { id: 3, text: "Dashboard", url: "/FarmerDashboard", showFor: ["Farmer"] },
    { id: 4, text: "Dashboard", url: "/BuyerDashboard", showFor: ["Retailer"] },
    { id: 5, text: "Contacts", url: "/Contacts", showFor: ["Farmer", "Retailer"] },
  ];

  useEffect(() => {
    if (loggedIn) {
      const filteredNavItems = allNavItems.filter(
        (item) => !item.showFor || item.showFor.includes(type)
      );
      setNavItems(filteredNavItems);
    } else {
      const filteredNavItems = allNavItems.filter((item) => item.text !== "Dashboard");
      setNavItems(filteredNavItems);
    }
  }, [type, loggedIn]);

  return (
    <header className="bg-white shadow-md fixed left-0 top-0 right-0 z-50">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center p-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <h1 className="font-bold text-xl text-green-600">
            Farm<span className="text-yellow-400">MART</span>
          </h1>
          <p className="text-sm text-gray-600">By Farmer Hands</p>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-xl">
          {navItems.map(({ id, text, url }) => (
            <NavLink
              key={id}
              to={url}
              className="text-gray-700 hover:text-black font-semibold"
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
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/Register"
                className="px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-100"
              >
                Join
              </Link>
              <span>|</span>
              <Link
                to="/Login"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenu(!menu)}
          className="md:hidden p-2 rounded-md bg-white shadow-md"
          aria-expanded={menu}
        >
          {menu ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menu && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-white z-40">
          <div className="flex flex-col items-center py-10">
            {navItems.map(({ id, text, url }) => (
              <NavLink
                key={id}
                to={url}
                className="text-xl text-gray-700 py-2"
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

export default NavBar2;
