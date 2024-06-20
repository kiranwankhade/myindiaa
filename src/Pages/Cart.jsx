import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  getCart,
  updateCart,
} from "../Redux/Cart/cart.actions";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FaHeartCircleXmark } from "react-icons/fa6";
import { MdRemoveShoppingCart } from "react-icons/md";

import emptyCart from "../Assets/empty-cart.gif"

const Cart = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [localCart, setLocalCart] = useState([]);

  const { loading, error, cartData } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const calculateTotalPrice = (cart = []) => {
    if (!Array.isArray(cart)) {
      cart = [];
    }
    let total = 0;
    cart.forEach((item) => {
      total += item.price * (item.quantity || 1);
    });
    const discount = total * 0.3;
    const final = total - discount;
    setTotalPrice(total);
    setDiscountPrice(discount);
    setTotal(final);
  };

  useEffect(() => {
    setLocalCart(cartData || []);
    calculateTotalPrice(cartData || []);
  }, [cartData]);



  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id)).then(() => {
      const updatedCart = localCart
        .slice()
        .filter((item) => item.id !== id);
      setLocalCart(updatedCart);
      calculateTotalPrice(updatedCart);
    });
  };

  const handleClearCart = () => {
    dispatch(clearCart()).then(() => {
      setLocalCart([]);
      calculateTotalPrice([]);
    });
  };

  const handleIncreaseQuantity = (id) => {
    const updatedCartItems = localCart.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: (item.quantity || 1) + 1 }; // If quantity is not present, default it to 1
      }
      return item;
    });
    setLocalCart(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
    dispatch(updateCart(updatedCartItems));
  };

  const handleDecreaseQuantity = (id) => {
    const updatedCartItems = localCart.map((item) => {
      if (item.id === id && (item.quantity || 1) > 1) {
        return { ...item, quantity: (item.quantity || 1) - 1 }; // If quantity is not present, default it to 1
      }
      return item;
    });
    setLocalCart(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
    dispatch(updateCart(updatedCartItems));
  };

  const handlePayment = async () => {
    try {
      await Promise.all(
        localCart.map(async (cart) => {
          try {
            await axios.post("https://cyclicbackend.onrender.com/watchList", cart);
          } catch (error) {
            console.error("Error sending cart data to watchlist:", error);
            throw error; // This will stop the Promise.all execution if any error occurs
          }
        })
      ).then(()=>{
        const totalPriceQueryParam = `?totalPrice=${total.toFixed(2)}`;
        window.location.href = `/payment${totalPriceQueryParam}`;
      });
     
    } catch (error) {
      console.error("Error sending cart data to watchlist:", error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="container mx-auto mt-8">
        <h1 className="text-4xl font-bold mb-4">Cart</h1>
        <div className="flex flex-col gap-10 lg:flex-row justify-between items-center lg:gap-10">
          
          <div className="w-80 lg:w-3/4 mb-4">
           
            {localCart.length === 0 ? (
              <div className="flex items-center justify-center mt-2">
                <img src={emptyCart} alt="Empty cart" className="w-90 h-50" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                {localCart.map((item) => (
                  <div
                    key={item.id}
                    className="w-60 m-auto bg-white p-4 rounded-lg shadow-md "
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-80 m-auto rounded-lg h-40 object-cover mb-4"
                    />
                    <h2 className="text-lg truncate  font-semibold mb-2">
                      {item.name}
                    </h2>
                    <p className="text-center mt-5 text-2xl font-semibold text-red-500">
                      ₹ {item.price * (item.quantity || 1)}
                    </p>
                    <div className="flex w-50  justify-center gap-2">
                      <button
                        className="flex items-center gap-2 bg-black text-white px-2 py-2 rounded-lg"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove <MdRemoveShoppingCart />
                      </button>

                      <div className="flex justify-center items-center ">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
                          onClick={() => handleDecreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        <span className="bg-gray-200 py-2 px-4">
                          {item.quantity || 1}
                        </span>
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
                          onClick={() => handleIncreaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
            {
              localCart.length !== 0 ?  
              <div className="w-80 mb-4 lg:w-1/4 sm:w-2/4 ml-4 bg-gray-100 p-4 rounded-lg sm:mt-10 sm:mb-4">
                <h2 className="text-xl font-bold mb-4">Total Price</h2>
                <div className="mb-4">
                  <p className="text-gray-600 text-xl font-bold">
                    Subtotal: ₹{totalPrice.toFixed(2)}
                  </p>
                  <p className="text-gray-600 text-xl font-bold">
                    Discount (30% off): -₹{discountPrice.toFixed(2)}
                  </p>
                  <p className="text-blue-800 text-xl font-bold">
                    Total: ₹{total.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={handleClearCart}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg mr-2 mb-2"
                >
                  Clear Cart
                </button>
                <button
                onClick={handlePayment}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                Proceed to Payment
                </button>
              </div>
              : 
              <></>
            }
       
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
