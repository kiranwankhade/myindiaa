import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineCloseCircle } from 'react-icons/ai';
import { FaTruckArrowRight  } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Components/Navbar';
import { getOrders, removeFromOrders } from '../Redux/Orders/order.actions';

const Orders = () => {
  const { loading, error, orders } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const [localOrders, setLocalOrders] = useState([]);


  console.log('orders:', orders)
  let today = new Date();
  let date =
    today.getDate() +
    '-' +
    parseInt(today.getMonth() + 1) +
    '-' +
    today.getFullYear();
  const [isOpen, setIsOpen] = useState(false);
  const [elem, setElem] = useState({});

  // Function to handle delete order modal opening
  const deleteOrder = (el) => {
    setIsOpen(true);
    setElem(el);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  useEffect(() => {
    setLocalOrders(orders || []);
  }, [orders]);

  // Calculate delivery date (5 days from today)
  const calculateDeliveryDate = () => {
    let today = new Date();
    today.setDate(today.getDate() + 5);
    return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  };

  const deliveryDate = calculateDeliveryDate();

  const deleteHandleOrder = (id) => {
    dispatch(removeFromOrders(id)).then(() => {
      setLocalOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
      setIsOpen(false);
    });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container mx-auto mt-20">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold">My Orders: [{orders?.length}]</p>
          <Link to="/" className="text-2xl">
            <AiOutlineHome />
          </Link>
        </div>
        <div className="mt-8">
          {orders?.map((item, id) => (
            <div key={id} className="flex justify-between items-center border-b pb-2">
              <div className="flex gap-4">
                <div className="w-20">
                  <img src={item.image} alt={item.price} className="w-full h-20" />
                </div>
                <div className='text-justify'>
                  <p className="text-lg font-semibold text-black truncate w-3/5">{item.name}</p>
                  <p className="text-red-600 font-semibold">Price: ₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FaTruckArrowRight  className="text-2xl" />
                  <p>Delivery by {deliveryDate}</p>
                </div>
                <button
                  onClick={() => deleteOrder(item)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Order Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Are You Sure To Delete Item:</h2>
              <button onClick={() => setIsOpen(false)}>
                <AiOutlineCloseCircle className="text-red-600 text-2xl cursor-pointer" />
              </button>
            </div>
            <p className="text-lg font-semibold mt-4">{elem.name}</p>
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mr-4"
              >
                Close
              </button>
              <button
                onClick={() => deleteHandleOrder(elem.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
