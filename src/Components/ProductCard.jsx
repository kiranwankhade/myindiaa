import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarRatings from './StarRatings'
import { toast } from 'react-toastify';
import {FaHeart,FaRegHeart } from "react-icons/fa"

import { BsCart,BsCartFill  } from "react-icons/bs";
import axios from 'axios';
import Alert from './Alert';

const ProductCard = ({product}) => {
    const [defaultImage, setDefaultImage] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isCart, setIsCart] = useState(false);

    const handleErrorImage = (data) => {
        setDefaultImage((prev) => ({
          ...prev,
          [data.target.alt]: data.target.alt,
          linkDefault: "img",
        }));
    };

    const handleAddCart = async () => {
        try {
            if (isCart) {
                setShowAlert(true);
                setAlertMessage('Already In Cart.');
            } else {
                await axios.post(`https://cyclicbackend.onrender.com/cart`, product);
                setShowAlert(true);
                setAlertMessage('Added to cart successfully.');
                setIsCart(true);
            }
        } catch (error) {
            setShowAlert(true);
            setAlertMessage('Failed to add to cart. Please try again later.');
        }
      };


      const handleWishlist = async () => {
        try {
            if (isWishlisted) {
                setShowAlert(true);
                setAlertMessage('Already Wish listed.');
            } else {
                await axios.post(`https://cyclicbackend.onrender.com/wishList`, product);
                setShowAlert(true);
                setAlertMessage('Added to wishlist successfully.');
                setIsWishlisted(true);
            }
        } catch (error) {
            setShowAlert(true);
            setAlertMessage('Failed to add to wishlist. Please try again later.');
        }
      };


      const handleCloseAlert = () => {
        setShowAlert(false);
    };
      
    const checkWishlist = async () => {
        try {
            const responseWishlist = await axios.get(`https://cyclicbackend.onrender.com/wishList`);
            const wishlistItems = responseWishlist.data;
            const isProductInWishlist = wishlistItems.some(item => item.id === product.id);
            setIsWishlisted(isProductInWishlist);
    
            const responseCart = await axios.get(`https://cyclicbackend.onrender.com/cart`);
            const cartItems = responseCart.data;
            const isProductInCart = cartItems.some(item => item.id === product.id);
            setIsCart(isProductInCart);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };
  
    useEffect(() => {
        checkWishlist();
    }, []);


    

    useEffect(() => {
        if (showAlert) {
            const timeout = setTimeout(() => {
                setShowAlert(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [showAlert]);
  return (
    <div className="bg-gray-200 rounded-lg shadow-lg w-80">
            <Link to={`/${product.id}`}>
                <div className="card-top">
                    <img
                        src={
                            defaultImage[product.name] === product.name
                                ? defaultImage.linkDefault
                                : product.image
                        }
                        alt={product.name}
                        onError={handleErrorImage}
                        className="w-90 h-56 object-cover mx-auto mt-2"
                    />
                    <p className="text-center truncate w-5/6 mt-10 px-4">{product.name}</p>
                    <p className="text-center mt-5 text-2xl font-semibold text-red-500">₹ {product.price}</p>
                    <div className="flex justify-center">
                        <StarRatings value={product.ratings} />
                    </div>
                </div>
            </Link>
            <div className="card-bottom flex justify-between items-center px-2 py-2">
                <button className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg" onClick={handleWishlist}>
                    {isWishlisted ? 'WISHLISTED' : 'WISHLIST'}
                    {isWishlisted ? <FaHeart /> : <FaRegHeart />}
                </button>
                <button className="flex items-center gap-2 bg-black text-white px-2 py-2 rounded-lg" onClick={handleAddCart}>
                    {isCart ? 'ADDED TO CART' : 'ADD TO CART'}
                    {isCart ? <BsCartFill  /> : <BsCart />}
                </button>
            </div>
            {showAlert && (
                <Alert type={alertMessage.includes('Already') ? "warning" : "success"} message={alertMessage} onClose={handleCloseAlert} />
            )}
        </div>
  
  )
}

export default ProductCard