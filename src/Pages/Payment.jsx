import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import celebration from "../Assets/done.gif"

const initDetails = {
    creditCardNum: '',
    cardHolder: '',
    expireMonth: 'January',
    expireYear: '2024',
    address:''
  };
const Payment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const totalPrice = searchParams.get("totalPrice");
  const [details, setDetails] = useState(initDetails);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate('/orders'); // Navigate to the order page
    }, 2000);
  };


  const closeModalAndNavigate = () => {
    setShowModal(false);
    navigate('/orders'); // Navigate to the order page
  };

  return (
    <>
 {showModal && (
        <div className="w-full h-full fixed inset-0 flex items-center justify-center z-50">
          <div className="w-full h-full bg-black bg-opacity-80 fixed inset-0 flex items-center justify-center" onClick={closeModalAndNavigate}>
            <div className="w-full h-100 bg-black bg-opacity-0 p-8 rounded-lg flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <img src={celebration} alt="Success" className="w-80 h-40  mb-4" />
              <h2 className="text-2xl font-semibold text-center text-white">Hurray! Order is placed..!!</h2>
            </div>
          </div>
        </div>
      )}
        <div className="container mx-auto mt-4">
        <h1 className="text-3xl font-semibold mb-2">Enter your Credit Card details And Address</h1>
        <p className="text-lg font-bold text-green-500">Total Amount will be deducted ₹ {totalPrice}</p>

        <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
            {/* Credit Card Number */}
            <div className="mb-2">
            <label htmlFor="creditCardNum" className="block mb-2 text-sm font-bold text-gray-700">
                Enter card number
            </label>
            <input
                type="text"
                id="creditCardNum"
                name="creditCardNum"
                value={details.creditCardNum}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-700"
                minLength="16"
                maxLength="16"
                required
            />
            </div>

            {/* Card Holder Name */}
            <div className="mb-2">
            <label htmlFor="cardHolder" className="block mb-2 text-sm font-bold text-gray-700">
                Card Holder Name
            </label>
            <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={details.cardHolder}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400  rounded-md focus:outline-none focus:border-blue-500"
                required
            />
            </div>

            {/* Expiration Date */}
            <div className="grid grid-cols-2 gap-4 mb-2">
            <div>
                <label htmlFor="expireMonth" className="block mb-2 text-sm font-bold text-gray-700">
                Expiration Month
                </label>
                <select
                id="expireMonth"
                name="expireMonth"
                value={details.expireMonth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                required
                >
                 <option name="January" value="January">
                    January
                  </option>
                  <option name="February" value="February">
                    February
                  </option>
                  <option name="March" value="March">
                    March
                  </option>
                  <option name="April" value="April">
                    April
                  </option>
                  <option name="May" value="May">
                    May
                  </option>
                  <option name="June" value="June">
                    June
                  </option>
                  <option name="July" value="July">
                    July
                  </option>
                  <option name="August" value="August">
                    August
                  </option>
                  <option name="September" value="September">
                    September
                  </option>
                  <option name="October" value="October">
                    October
                  </option>
                  <option name="November" value="November">
                    November
                  </option>
                  <option name="December" value="December">
                    December
                  </option>
                </select>
            </div>
            <div>
                <label htmlFor="expireYear" className="block mb-2 text-sm font-bold text-gray-700">
                Year
                </label>
                <select
                id="expireYear"
                name="expireYear"
                value={details.expireYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                required
                >
                  <option name="2024" value="2024">
                    2024
                  </option>
                  <option name="2025" value="2025">
                    2025
                  </option>
                  <option name="2026" value="2026">
                    2026
                  </option>
                  <option name="2027" value="2027">
                    2027
                  </option>
                  <option name="2028" value="2028">
                    2028
                  </option>
                  <option name="2029" value="2029">
                    2029
                  </option>
                  <option name="2030" value="2030">
                    2030
                  </option>
                  <option name="2031" value="2031">
                    2031
                  </option>
                  <option name="2032" value="2032">
                    2032
                  </option>
                </select>
            </div>
            </div>

            {/* CVV */}
            <div className="mb-2">
            <label htmlFor="cvv" className="block mb-2 text-sm font-bold text-gray-700">
                CVV
            </label>
            <input
                type="password"
                id="cvv"
                name="cvv"
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="CVV"
                required
            />
            </div>

             {/* Card Holder address */}
             <div className="mb-2">
            <label htmlFor="address" className="block mb-2 text-sm font-bold text-gray-700">
                Address
            </label>
            <input
                type="text"
                id="address"
                name="address"
                value={details.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
                required
            />
            </div>

            {/* Submit Button */}
            <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
            Submit Payment
            </button>
        </form>
        </div>
    </>
  );
};

export default Payment;
