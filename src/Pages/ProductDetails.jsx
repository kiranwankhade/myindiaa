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

export default function ItemDetails() {
  const { id } = useParams();
  const [itemDetail, setItemDetail] = useState({});
  const [angle, setAngle] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    fetch(`https://cyclicbackend.onrender.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => setItemDetail(res))
      .catch((err) => console.log(err));
  }, [id]);

  const { name, price, description, category, image, ratings, view } = itemDetail;

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    alert("Wishlist updated");
  };

  const handleAddCart = () => {
    setIsCart(!isCart);
    alert("Cart updated");
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
    checkWishlist();
}, []);

  return (
    <div className="w-11/12 mx-auto">
      <div className="mt-5">
        <nav className="flex items-center text-gray-500 space-x-2">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <FaAngleRight />
          <span className="truncate w-1/2">{name}</span>
        </nav>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-col md:flex-col lg:flex-row">
        <img
          className="w-full lg:w-2/5 h-96 object-cover mx-auto"
          src={image}
          alt="detailsimage"
        />
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <div className="mt-4 flex items-center space-x-2">
            <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              ★ {ratings} ({view})
            </span>
          </div>

          <div className="mt-4 flex items-center space-x-4">
            <span className="text-xl">₹ {price}</span>
            <button className="bg-green-700 text-white py-1 px-3 rounded">
              FREE SHIPPING
            </button>
            <span className="text-xs italic opacity-70">(T&C applicable)</span>
          </div>

          <h3 className="mt-4 text-lg font-semibold">AVAILABLE OFFERS!!</h3>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              Grab A Complimentary Product Worth Rs.3000 On A Spend Of Rs.4999{" "}
              <span className="underline cursor-pointer">Know More</span>
            </li>
            <li>
              Grab A Complimentary Product Worth Rs.1400 On A Spend Of Rs.3399{" "}
              <span className="underline cursor-pointer">Know More</span>
            </li>
          </ul>

          <div className="flex justify-between items-center mt-4">
            <button
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
              onClick={handleWishlist}
            >
              {isWishlisted ? "WISHLISTED" : "WISHLIST"}
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg"
              onClick={handleAddCart}
            >
              {isCart ? "ADDED TO CART" : "ADD TO CART"}
              {isCart ? <BsCartFill /> : <BsCart />}
            </button>
          </div>

          <div className="border-t border-gray-300 my-4"></div>

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

          <div className="border-t border-gray-300 my-4"></div>

          <div className="flex items-center space-x-2">
            <button
              className="flex items-center space-x-2 text-pink-500 cursor-pointer"
              onClick={handleReadMore}
            >
              <span className="text-lg font-semibold">Description</span>
              {angle ? <FaAngleDown /> : <FaAngleRight />}
            </button>
          </div>
          <div id="disHideDiv" className="hidden mt-2">
            <p>{description}</p>
          </div>

          <div className="border-t border-gray-300 my-4"></div>

          <Link to="/cart">
            <button className="bg-black text-white py-2 px-4 rounded">
              GO TO CART
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
