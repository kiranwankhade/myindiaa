import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaAngleRight, FaHeart, FaAngleDown, FaRegHeart } from "react-icons/fa";
import { BsCartFill, BsCart } from "react-icons/bs";
import {
  MdOutlineCrueltyFree,
  MdOutlineWaterDrop,
  MdSettings,
  MdOutlineAssignmentReturn,
} from "react-icons/md";
import Navbar from "../Components/Navbar";
import Alert from "../Components/Alert";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Footer from "../Components/Footer";

export default function ItemDetails() {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState({});
  const [angle, setAngle] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCart, setIsCart] = useState(false);

  const [user, loading, authError] = useAuthState(auth);

  useEffect(() => {
    fetch(`https://cyclicbackend.onrender.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => setItemDetail(res))
      .catch((err) => console.log(err));
  }, [id]);

  const { name, price, description, category, image, ratings, view } = itemDetail;

  const handleWishlist = async() => {
    if (!user) {
      setShowAlert(true);
      setAlertMessage("Please sign in first.");
      return;
    }
    try {
      if (isWishlisted) {
        setShowAlert(true);
        setAlertMessage("Already Wish listed.");
      } else {
        await axios.post(
          `https://cyclicbackend.onrender.com/wishList`,
          itemDetail
        );
        setShowAlert(true);
        setAlertMessage("Added to wishlist successfully.");
        setIsWishlisted(true);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertMessage("Failed to add to wishlist. Please try again later.");
    }
  };

  const handleAddCart = async() => {
    if (!user) {
      setShowAlert(true);
      setIsWishlisted(false)
      setIsCart(false)
      setAlertMessage("Please sign in first.");
      return;
    }
    try {
      if (isCart) {
        setShowAlert(true);
        setAlertMessage("Already In Cart.");
      } else {
        await axios.post(`https://cyclicbackend.onrender.com/cart`, itemDetail);
        setShowAlert(true);
        setAlertMessage("Added to cart successfully.");
        setIsCart(true);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertMessage("Failed to add to cart. Please try again later.");
    }
  };

  const handleReadMore = () => {
    const targetDiv = document.getElementById("disHideDiv");
    if (targetDiv.style.display !== "none") {
      targetDiv.style.display = "none";
      setAngle(false);
    } else {
      targetDiv.style.display = "block";
      setAngle(true);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [showAlert]);


  const checkWishlist = async () => {
    try {
        const responseWishlist = await axios.get(`https://cyclicbackend.onrender.com/wishList`);
        const wishlistItems = responseWishlist.data;

        const isProductInWishlist = wishlistItems.some(item => item.id === itemDetail.id);
        setIsWishlisted(isProductInWishlist);

        const responseCart = await axios.get(`https://cyclicbackend.onrender.com/cart`);
        const cartItems = responseCart.data;
        const isProductInCart = cartItems.some(item => item.id === itemDetail.id);
        setIsCart(isProductInCart);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
    }
};

useEffect(() => {
  if (user) {
    checkWishlist();
  }
}, []);

  return (
  <div  className="flex flex-col min-h-screen">
    <Navbar/>
      <div className="w-9/12 m-auto mb-4">
      <div className="mt-4">
        <nav className="flex items-center text-gray-500 space-x-2">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <FaAngleRight />
          <span className="truncate w-1/2">{name}</span>
        </nav>
      </div>

      <div className="mt-2 flex flex-col gap-10 sm:flex-col md:flex-col lg:flex-row">
        <img
          className="w-full lg:w-2/5 h-70 object-cover mx-auto"
          src={image}
          alt="detailsimage"
        />
        <div>
          <h2 className="text-1.5xl font-semibold text-justify">{name}</h2>
          <div className="mt-2 flex items-center space-x-2">
            <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              ★ {ratings} ({view})
            </span>
          </div>

          <div className="mt-2 flex items-center space-x-4">
            <span className="text-xl">₹ {price}</span>
            <button className="bg-green-700 text-white py-1 px-2 rounded">
              FREE SHIPPING
            </button>
            <span className="text-xs italic opacity-70">(T&C applicable)</span>
          </div>

          <h3 className="mt-2 text-sm font-semibold text-blue-500">AVAILABLE OFFERS!!</h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>
              Grab A Complimentary Product Worth Rs.3000 On A Spend Of Rs.4999{" "}
              <span className="underline cursor-pointer">Know More</span>
            </li>
            <li>
              Grab A Complimentary Product Worth Rs.1400 On A Spend Of Rs.3399{" "}
              <span className="underline cursor-pointer">Know More</span>
            </li>
          </ul>

          <div className="flex justify-start gap-4 items-start mt-2">
            <button
              className="flex items-center gap-2 bg-black text-white px-4 py-1 rounded-lg"
              onClick={handleWishlist}
            >
              {isWishlisted ? "WISHLISTED" : "WISHLIST"}
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button
              className="flex items-center gap-2 bg-black text-white px-4 py-1 rounded-lg"
              onClick={handleAddCart}
            >
              {isCart ? "ADDED TO CART" : "ADD TO CART"}
              {isCart ? <BsCartFill /> : <BsCart />}
            </button>
          </div>
          {showAlert && (
        <div className="mt-4 w-60 ">
        <Alert
          type={alertMessage.includes("Already") ? "warning" : "success"}
          message={alertMessage}
          onClose={handleCloseAlert}
        />
        </div>
      )}
          <div className="border-t border-gray-300 my-2"></div>

          <div className="flex items-center space-x-2 text-sm">
            <MdOutlineCrueltyFree />
            <span>Cruelty Free</span>
            <MdOutlineAssignmentReturn />
            <span>Easy Return</span>
            <MdSettings />
            <span>Quality First</span>
            <MdOutlineWaterDrop />
            <span>Dermatologically Tested</span>
          </div>

          <div className="border-t border-gray-300 my-2"></div>

          <div className="flex items-center space-x-2 ">
            <button
              className="flex items-center space-x-2 text-pink-500 cursor-pointer"
              onClick={handleReadMore}
            >
              <p className="text-lg font-semibold">Description</p>
              {angle ? <FaAngleDown /> : <FaAngleRight />}
            </button>
          </div>
          <div id="disHideDiv" className="hidden mt-2">
            <p>{description}</p>
          </div>

          <div className="border-t border-gray-300 my-2"></div>

          {
            user ? <Link to="/cart">
            <button className="bg-black text-white py-2 px-4 rounded">
              GO TO CART
            </button>
          </Link> : <></>
          }
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  );
}
