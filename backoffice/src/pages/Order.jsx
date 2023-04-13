import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logoNav from "../assets/logo.jpg";

const Order = () => {

  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    axios.get('http://localhost:5000/api/order/allorders')
      .then(response => {
        setOrders(response.data.data);
        console.log('Orders', orders);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    getOrders();
  }, []);

  const handleDeleteOrder = (orderId) => {
    axios.delete(`http://localhost:5000/api/order/${orderId}`)
      .then(response => {
        toast.success('Order deleted successfully');
        setOrders(orders.filter(order => order._id !== orderId));
      })
      .catch(error => {
        console.error(error);
        toast.error('Error deleting order');
      });
  }

  return (
    <div className='bg-white'>
      <Link to="/office">
        <img src={logoNav} alt="merkob.ma" className="w-[150px]" />
      </Link>
      <div className='flex justify-between mt-8 mx-5'>
        <div className="justify-end mb-4"></div>
      </div>
      <div className="bg-white shadow-md rounded-md mt-5">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-700 font-medium text-sm">
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Quantité</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order.product.productName}</td>
                <td className="border px-4 py-2">{order.user.name}</td>
                <td className="border px-4 py-2">{order.quantité}</td>
                <td className="border px-4 py-2">
                  {/* <Link
                    to={`/updateorder/${order._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded shadow-md hover:bg-blue-500 transition duration-300 mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded shadow-md hover:bg-red-500 transition duration-300"
                  >
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default Order;
