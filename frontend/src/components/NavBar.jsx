import React, { useContext, useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function NavBar() {
  const { loggedIn, loggedInUser, logout, type, menu, setMenu } = useContext(AuthContext);
  const [navItems, setNavItems] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const allNavItems = [
    { id: 1, text: "HOME", url: "/" },
    { id: 2, text: "SHOP", url: "/Buyer", showFor: ["Retailer"] },
    { id: 3, text: "SELL", url: "/Farmer", showFor: ["Farmer"] },
    { id: 4, text: "DASHBOARD", url: "/FarmerDashboard", showFor: ["Farmer"] },
    { id: 5, text: "DASHBOARD", url: "/BuyerDashboard", showFor: ["Retailer"] },
    { id: 6, text: "SERVICES", url: "/Services" },
    { id: 7, text: "CONTACTS", url: "/Contacts", showFor: ["Farmer", "Retailer"] },
  ];

  useEffect(() => {
    if (loggedIn) {
      const filteredNavItems = allNavItems.filter(
        (item) => item.text === "SERVICES" || !item.showFor || item.showFor.includes(type)
      );
      setNavItems(filteredNavItems);
    } else {
      const filteredNavItems = allNavItems.filter(
        (item) => item.text === "HOME" || item.text === "SERVICES" || item.text === "CONTACTS"
      );
      setNavItems(filteredNavItems);
    }
  }, [type, loggedIn]);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div className="max-w-screen-2xl h-16 container md:px-auto shadow-md fixed left-0 top-0 right-0 z-50 bg-white">
      <div className="flex justify-between items-center mx-10 h-16">
        <div className="flex gap-8 md:gap-0 space-x-8 items-center">
          <h1 className="font-bold text-xl">
            Farm<span className="text-yellow-400 text-xl">MART</span>
            <p className="text-sm">By Farmer Hands</p>
          </h1>
        </div>

        <div className="hidden md:flex text-gray-700 space-x-10 text-xl gap-6">
          {navItems.map(({ id, text, url }) => (
            <li className="font-bold hover:text-black duration-150 cursor-pointer list-none" key={id}>
              <NavLink to={url} className={({ isActive }) => (isActive ? "active-link" : "")}>
                {text}
              </NavLink>
            </li>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4 font-bold">
          {loggedIn ? (
            <>
              <Link
                to="/Profile"
                className="p-2 px-4 border text-orange-500 border-orange-500 cursor-pointer rounded-md"
              >
                View Profile
              </Link>
              <button
                onClick={handleLogoutClick}
                className="p-2 px-4 bg-red-500 text-white cursor-pointer rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/Register"
                className="p-2 px-4 border text-green-500 border-green-500 cursor-pointer rounded-md"
              >
                Join
              </Link>
              <span>|</span>
              <Link
                to="/Login"
                className="p-2 px-4 bg-green-500 text-white cursor-pointer rounded-md"
              >
                Login
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenu(!menu)}
          className="fixed top-4 right-4 border-2 p-2 z-50 bg-white rounded-md shadow-md md:hidden"
          aria-expanded={menu}
          aria-controls="mobile-menu"
        >
          {menu ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {showLogoutConfirm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4">Are you sure you want to log out?</h2>
            <div className="flex justify-between">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Log Out
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {menu && (
        <div id="mobile-menu" className="h-screen w-full bg-white fixed top-0 left-0 z-40 overflow-y-auto shadow-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">Menu</h2>
            <button
              onClick={() => setMenu(false)}
              className="text-gray-800 hover:text-gray-600 focus:outline-none"
            >
              <IoCloseSharp size={28} />
            </button>
          </div>
          <ul className="flex flex-col space-y-6 text-lg items-center pt-8">
            {!loggedIn && (
              <div className="flex flex-col items-center gap-4 mb-4">
                <Link
                  to="/Register"
                  className="p-2 px-4 border text-green-500 border-green-500 cursor-pointer rounded-md transition duration-300 hover:bg-green-100"
                  onClick={() => setMenu(false)}
                >
                  Join
                </Link>
                <Link
                  to="/Login"
                  className="p-2 px-4 bg-green-500 text-white cursor-pointer rounded-md transition duration-300 hover:bg-green-600"
                  onClick={() => setMenu(false)}
                >
                  Login
                </Link>
              </div>
            )}
            {navItems.map(({ id, text, url }) => (
              <li className="font-semibold list-none w-full" key={id} onClick={() => setMenu(false)}>
                <Link
                  to={url}
                  className="block py-2 px-4 w-full text-center text-gray-800 hover:bg-gray-100 rounded-md transition duration-300"
                >
                  {text}
                </Link>
              </li>
            ))}
            {loggedIn && (
              <Link
                to="/Profile"
                className="p-2 px-4 text-orange-500 border border-orange-500 cursor-pointer rounded-md hover:bg-orange-100 transition duration-300"
                onClick={() => setMenu(false)}
              >
                View Profile
              </Link>
            )}
            {loggedIn && (
              <Link
                to="/"
                onClick={handleLogoutClick}
                className="p-2 px-4 bg-red-400 text-white cursor-pointer rounded-md hover:bg-red-500 transition duration-300"
              >
                Logout
              </Link>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;
