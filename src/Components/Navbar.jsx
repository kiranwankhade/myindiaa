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

  return (
    <header className="bg-gray-800 text-white">
      <nav className="flex flex-col md:flex-row md:justify-between items-center p-1">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-20 h-14 md:w-20 md:h-20" />
        </Link>
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2 md:mt-0">
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
        </div>
        <ul className="flex flex-col md:flex-row md:space-x-6 text-center mt-4 md:mt-0">
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
              <li className="mt-4">
                <Link to="/login">Login</Link>
              </li>
              <li className="mt-4">
                <Link to="/sign-up">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
