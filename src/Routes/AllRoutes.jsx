import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from '../Pages/Login'
import Home from '../Pages/Home'
import SignUp from '../Pages/Signup'
import ProductDetails from '../Pages/ProductDetails'
import Cart from '../Pages/Cart'
import Wishlist from '../Pages/Wishlist'
import Orders from '../Pages/Orders'
import SearchResultPage from '../Pages/SearchResultPage'
import Payment from '../Pages/Payment'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/search/:q" element={<SearchResultPage/>} />
        <Route path="/products/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/payment' element={<Payment />} />
    </Routes>
  )
}

export default AllRoutes