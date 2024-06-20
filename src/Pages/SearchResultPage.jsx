import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import ProductCard from "../Components/ProductCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const SearchResultPage = () => {
  const { q } = useParams();
  const location = useLocation();
  const filteredProduct = location.state ? location.state.filteredProduct : [];
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;
  const totalPages = Math.ceil(filteredProduct.length / perPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const visibleProduct = filteredProduct.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const isNextDisabled = currentPage === totalPages;
  const isPrevDisabled = currentPage === 1;

  return (
    <>
      <Navbar/>
      <div className="flex flex-row items-start">
         <Link
            to="/"
            style={{ textDecoration: "none", color: "#4285f4" }}
            className="ml-8 mt-4"
          >
            <button
              className="text-back text-lg bg-transparent border border-black py-2 px-4 flex items-center hover:bg-blue-500 hover:border-blue-500 rounded-md transition-all duration-300 hover:text-white"
            >
              <FaLongArrowAltLeft className="mr-2" />
              Back
            </button>
          </Link>
          <h2 className="text-black text-2xl md:text-3xl lg:text-4xl pt-4 ml-8">
            Search Results for "{q}"
          </h2>
      </div>
        
      <div className="w-full m-auto flex flex-col items-center font-cursive">
        <div className="w-full md:w-4/5 lg:w-3/4  flex flex-col items-center">
     
          {visibleProduct.length === 0 ? (
            <div className="w-full flex justify-center mt-6">
              <p className="text-black text-xl">No product found matching the search criteria.</p>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center mt-8 ">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20">
                {visibleProduct.map((product, i) => {
                  return <ProductCard key={i} product={product} />;
                })}
              </div>
            </div>
          )}
          {totalPages > 1 && (
            <div className="w-full mt-8 flex justify-center items-center mb-4">
              <button
                className={`text-white text-lg bg-blue-500 py-2 px-4 rounded-md mr-4 ${
                  isPrevDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"
                }`}
                disabled={isPrevDisabled}
                onClick={handlePrevPage}
              >
                Previous
              </button>
              <p className="text-blue-500 text-lg font-bold">
                {currentPage} / {totalPages}
              </p>
              <button
                className={`text-white text-lg bg-blue-500 py-2 px-4 rounded-md ml-4 ${
                  isNextDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"
                }`}
                disabled={isNextDisabled}
                onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
    </div>
    </>
  );
};

export default SearchResultPage;
