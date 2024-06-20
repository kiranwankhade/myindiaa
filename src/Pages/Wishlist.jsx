// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   getWishlist,
//   removeFromWishlist,
// } from "../Redux/Wishlist/wishlist.actions";

// import { Link } from "react-router-dom";
// import { FaLongArrowAltLeft } from "react-icons/fa";
// import StarRatings from "../Components/StarRatings";

// import { FaHeartCircleXmark } from "react-icons/fa6";
// import { BsCart, BsCartFill } from "react-icons/bs";

// import noWishList from "../Assets/No Wishlist.png";
// import axios from "axios";
// import Alert from "../Components/Alert";

// function Wishlist() {
//   const [productAlerts, setProductAlerts] = useState({});
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [isCart, setIsCart] = useState(false);

//   const dispatch = useDispatch();
//   const { loading, error, wishlistData } = useSelector(
//     (state) => state.wishlist
//   );
//   const [localWishlist, setLocalWishlist] = useState([]);

//   useEffect(() => {
//     dispatch(getWishlist());
//   }, [dispatch]);

//   useEffect(() => {
//     setLocalWishlist(wishlistData);
//   }, [wishlistData]);

//   console.log("wishlistData:", wishlistData);

//   const handleRemoveFromWishlist = (id) => {
//     dispatch(removeFromWishlist(id)).then(() => {
//       const updatedWishlist = localWishlist
//         .slice()
//         .filter((item) => item.id !== id);
//       setLocalWishlist(updatedWishlist);
//     });
//   };

//   const checkCart = async (id) => {
//     try {
//       const responseCart = await axios.get(
//         `https://cyclicbackend.onrender.com/cart`
//       );
//       const cartItems = responseCart.data;
//       const isProductInCart = cartItems.some((item) => item.id === id);
//       setIsCart(isProductInCart)
//     } catch (error) {
//       console.error("Error fetching cart:", error);
//     }
//   };

//   useEffect(() => {
//     wishlistData.forEach((item) => {
//       checkCart(item.id);
//     });
//   }, [wishlistData]);

//   const handleCloseAlert = (id) => {
//     setProductAlerts(prevState => ({
//       ...prevState,
//       [id]: { showAlert: false, message: '' }
//     }));
//   };

//   // const handleAddToCart = async (item) => {
//   //   try {
//   //     console.log('isCart:', isCart)
//   //     if (isCart) {
//   //       setProductAlerts((prevState) => ({
//   //         ...prevState,
//   //         [item.id]: { showAlert: true, message: "Already in cart." },
//   //       }));
//   //     } else {
//   //       await axios.post(`https://cyclicbackend.onrender.com/cart`, item);
//   //       setIsCart(true);
//   //       setProductAlerts((prevState) => ({
//   //         ...prevState,
//   //         [item.id]: {
//   //           showAlert: true,
//   //           message: "Added to cart successfully.",
//   //         },
//   //       }));
//   //     }
//   //   } catch (error) {
//   //     setProductAlerts((prevState) => ({
//   //       ...prevState,
//   //       [item.id]: {
//   //         showAlert: true,
//   //         message: "Failed to add to cart. Please try again later.",
//   //       },
//   //     }));
//   //   }
//   // };

//   const handleAddToCart = async (item) => {
//     try {
//       console.log('isCart:', isCart);
//       if (isCart) {
//         setProductAlerts((prevState) => ({
//           ...prevState,
//           [item.id]: { showAlert: true, message: "Already in cart." },
//         }));
//       } else {
//         await axios.post(`https://cyclicbackend.onrender.com/cart`, item);
//         setIsCart(true);
//         setProductAlerts((prevState) => ({
//           ...prevState,
//           [item.id]: {
//             showAlert: true,
//             message: "Added to cart successfully.",
//           },
//         }));
//       }
//     } catch (error) {
//       setProductAlerts((prevState) => ({
//         ...prevState,
//         [item.id]: {
//           showAlert: true,
//           message: "Failed to add to cart. Please try again later.",
//         },
//       }));
//     }
//   };
//   console.log("productAlerts",productAlerts)

//   return (
//     <div className="container mx-auto mt-8">
//       <h1 className="text-4xl font-bold mb-2 text-red-900 ">Wishlist</h1>
//       {loading && <p>Loading...</p>}
//       <Link
//         to="/"
//         style={{ textDecoration: "none", color: "#4285f4" }}
//         className="ml-8 mt-4"
//       >
//         <button className="text-back text-lg bg-transparent border border-black py-2 px-4 flex items-center hover:bg-blue-500 hover:text-white hover:border-blue-500 rounded-md transition-all duration-300">
//           <FaLongArrowAltLeft className="mr-2" />
//           Back
//         </button>
//       </Link>
//       {localWishlist.length === 0 ? (
//         <div className="flex items-center justify-center">
//           <img src={noWishList} alt="Empty Wishlist" className="w-90 h-50" />
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {localWishlist.map((item) => (
//             <div
//               key={item.id}
//               className="w-full bg-white p-4 rounded-lg shadow-md"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-80 rounded-lg h-60 object-cover mb-4"
//               />
//               <h2 className="text-lg truncate w-5/6  font-semibold mb-2">
//                 {item.name}
//               </h2>
//               <p className="text-center mt-5 text-2xl font-semibold text-red-500">
//                 ₹ {item.price}
//               </p>
//               <div className="flex justify-center mb-4">
//                 <StarRatings value={item.ratings} />
//               </div>
//               <div className="flex justify-between">
//                 <button
//                   className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
//                   onClick={() => handleRemoveFromWishlist(item.id)}
//                 >
//                   Remove from Wishlist <FaHeartCircleXmark />
//                 </button>
//                 <button
//                   className="flex items-center gap-2 bg-black text-white px-2 py-2 rounded-lg"
//                   onClick={() => handleAddToCart(item)}
//                 >
//                   {isCart ? "ADDED IN CART" : "ADD TO CART"}
//                   {isCart ? <BsCartFill /> : <BsCart />}
//                 </button>
//               </div>
//               {showAlert && (
//                 <div className="mt-2">
//                   {productAlerts[item.id] &&
//                     productAlerts[item.id].showAlert && (
//                       <div className="mt-2">
//                         <Alert
//                           type={
//                             productAlerts[item.id].message.includes("Already")
//                               ? "warning"
//                               : "success"
//                           }
//                           message={productAlerts[item.id].message}
//                           onClose={() => handleCloseAlert(item.id)}
//                         />
//                       </div>
//                     )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Wishlist;


import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getWishlist,
  removeFromWishlist,
} from "../Redux/Wishlist/wishlist.actions";

import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import StarRatings from "../Components/StarRatings";

import { FaHeartCircleXmark } from "react-icons/fa6";
import { BsCart, BsCartFill } from "react-icons/bs";

import noWishList from "../Assets/No Wishlist.png";
import axios from "axios";
import Alert from "../Components/Alert";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function Wishlist() {
  const [productAlerts, setProductAlerts] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isCart, setIsCart] = useState({});
  
  const dispatch = useDispatch();
  const { loading, error, wishlistData } = useSelector(
    (state) => state.wishlist
  );
  const [localWishlist, setLocalWishlist] = useState([]);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  useEffect(() => {
    setLocalWishlist(wishlistData);
  }, [wishlistData]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get(`https://cyclicbackend.onrender.com/cart`);
        const cartItems = response.data;
        const cartItemIds = cartItems.map(item => item.id);
        setIsCart(cartItemIds.reduce((acc, curr) => {
          acc[curr] = true;
          return acc;
        }, {}));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCartData();
  }, []);

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id)).then(() => {
      const updatedWishlist = localWishlist
        .slice()
        .filter((item) => item.id !== id);
      setLocalWishlist(updatedWishlist);
    });
  };

  const handleCloseAlert = (id) => {
    setProductAlerts(prevState => ({
      ...prevState,
      [id]: { showAlert: false, message: '' }
    }));
  };

  const handleAddToCart = async (item) => {
    try {
      if (isCart[item.id]) {
        setProductAlerts((prevState) => ({
          ...prevState,
          [item.id]: { showAlert: true, message: "Already in cart." },
        }));
      } else {
        await axios.post(`https://cyclicbackend.onrender.com/cart`, item);
        setIsCart(prevState => ({
          ...prevState,
          [item.id]: true
        }));
        setProductAlerts((prevState) => ({
          ...prevState,
          [item.id]: {
            showAlert: true,
            message: "Added to cart successfully.",
          },
        }));
      }
    } catch (error) {
      setProductAlerts((prevState) => ({
        ...prevState,
        [item.id]: {
          showAlert: true,
          message: "Failed to add to cart. Please try again later.",
        },
      }));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold mt-6 mb-2 text-red-900 ">Wishlist</h1>
      <Link
          to="/"
          style={{ textDecoration: "none", color: "#4285f4" }}
          className="mr-10 mt-2"
        >
          <button className="ml-10 text-back text-lg bg-transparent border border-black py-2 px-6  flex items-center hover:bg-blue-500 hover:text-white hover:border-blue-500 rounded-md transition-all duration-300 ">
            <FaLongArrowAltLeft className="mr-2" />
            Back
          </button>
      </Link>
      <div className="container mx-auto ">
       
        {localWishlist.length === 0 ? (
          <div className="flex items-center justify-center mb-4">
            <img src={noWishList} alt="Empty Wishlist" className="w-90 h-50" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 justify-center">
            {localWishlist.map((item) => (
              <div
                key={item.id}
                className="w-full bg-white p-4 rounded-lg shadow-md "
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-80 rounded-lg h-60 object-cover mb-4"
                />
                <h2 className="text-lg truncate w-5/6  font-semibold mb-2 text-center">
                  {item.name}
                </h2>
                <p className="text-center mt-5 text-2xl font-semibold text-red-500">
                  ₹ {item.price}
                </p>
                <div className="flex justify-center mb-4">
                  <StarRatings value={item.ratings} />
                </div>
                <div className="flex justify-between">
                  <button
                    className="flex items-center gap-2 bg-black text-white px-2 py-2 rounded-lg"
                    onClick={() => handleRemoveFromWishlist(item.id)}
                  >
                    Remove from Wishlist <FaHeartCircleXmark />
                  </button>
                  <button
                    className="flex items-center gap-2 bg-black text-white px-2 py-2 rounded-lg"
                    onClick={() => handleAddToCart(item)}
                  >
                    {isCart[item.id] ? "ADDED TO CART" : "ADD TO CART"}
                    {isCart[item.id] ? <BsCartFill /> : <BsCart />}
                  </button>
                </div>
                {showAlert && (
                  <div className="mt-2">
                    {productAlerts[item.id] &&
                      productAlerts[item.id].showAlert && (
                        <div className="mt-2">
                          <Alert
                            type={
                              productAlerts[item.id].message.includes("Already")
                                ? "warning"
                                : "success"
                            }
                            message={productAlerts[item.id].message}
                            onClose={() => handleCloseAlert(item.id)}
                          />
                        </div>
                      )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default Wishlist;
