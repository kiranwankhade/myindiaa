
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../Components/ProductCard'
import { fetchProducts } from '../Redux/Products/product.actions';
import Navbar from '../Components/Navbar';
import { Bars } from "react-loader-spinner";
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import Footer from '../Components/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const [user, loading, authError] = useAuthState(auth);
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log('user:', user)
  console.log('products:', products)


  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
        <h2 className="text-black text-2xl md:text-3xl lg:text-4xl pt-8 ml-8">
          Our Products
        </h2>
        <main className='w-full flex justify-center items-center flex-col mt-8 mb-10'>
        {
            status=="loading" ? 
            <div className='w-full flex justify-center items-center flex-col mt-10 mb-14'>
            <Bars
              height="100"
              width="100"
              color="#208080"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>: 
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        }
      </main>
     
        <Footer/>



    </div>
  );
};

export default Home;
