import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../Redux/Auth/auth.actions";
import logo from "../Assets/Myindiaa_Logo.png";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const [user, loading, authError] = useAuthState(auth);
  const products = useSelector((state) => state.products.items);
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false); // State to toggle menu on small screens
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const searchWithoutSpaces = search.replace(/\s/g, "");
    const filteredProduct = products.filter((item) =>
      item.name.toLowerCase().includes(searchWithoutSpaces.toLowerCase())
    );
    navigate(`/search/${encodeURIComponent(searchWithoutSpaces)}`, {
      state: { filteredProduct },
    });
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header className="bg-gray-800 text-white relative">
      <nav className="flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="w-20 h-14 md:w-20 md:h-20 mr-2" />
            <span className="hidden md:block">My India</span>
          </Link>
        </div>
        {/* Hamburger icon for small screens */}
        <div className="md:hidden">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {showMenu ? (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 13H5v-2h14v2zm0-5H5V6h14v2zm0 10H5v-2h14v2z"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16v2H4V6zm0 7h16v2H4v-2zm0 7h16v2H4v-2z"
                />
              )}
            </svg>
          </button>
        </div>
        {/* Menu for medium and large screens */}
        <div className="hidden md:flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <input
            type="text"
            placeholder="Search Products"
            className="px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 placeholder:text-teal text-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyUp={handleKeyPress}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
          <ul className="flex flex-col md:flex-row md:space-x-6 text-center">
            <li className="mt-4">
              <Link to="/">Home</Link>
            </li>
            {user ? (
              <>
                <li className="mt-4">
                  <Link to="/cart">Cart</Link>
                </li>
                <li className="mt-4">
                  <Link to="/wishlist">Wishlist</Link>
                </li>
                <li className="mt-4">
                  <Link to="/orders">Orders</Link>
                </li>
                <li className="cursor-pointer mt-4" onClick={handleLogout}>
                  Logout
                </li>
                <li className="flex flex-col items-center justify-center md:justify-end px-4">
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-2"
                    />
                  )}
                  <p>{user.displayName}</p>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/sign-up">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Drawer for small screens */}
      {showMenu && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-end bg-black bg-opacity-50"
          onClick={closeMenu}
        >
          <div
            className="bg-gray-800 text-white w-1/2 h-full p-4"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the drawer
          >
            <ul className="flex flex-col space-y-4">
              <li>
                <Link to="/" onClick={closeMenu}>Home</Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/cart" onClick={closeMenu}>Cart</Link>
                  </li>
                  <li>
                    <Link to="/wishlist" onClick={closeMenu}>Wishlist</Link>
                  </li>
                  <li>
                    <Link to="/orders" onClick={closeMenu}>Orders</Link>
                  </li>
                  <li className="cursor-pointer" onClick={() => { handleLogout(); closeMenu(); }}>
                    Logout
                  </li>
                  <li className="flex flex-col items-center justify-center md:justify-end px-4">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-2"
                      />
                    )}
                    <p>{user.displayName}</p>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                  </li>
                  <li>
                    <Link to="/sign-up" onClick={closeMenu}>Sign Up</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
