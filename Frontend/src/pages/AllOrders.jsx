import React, { useState, useEffect } from 'react';
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { Link } from 'react-router-dom';

const AllOrders = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [orders, setOrders] = useState(null);

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-all-orders", { headers });
        // Filter out invalid or null orders
        const validOrders = res.data.data.filter((order) => order && order._id && order.book);
        setOrders(validOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  // Function to handle status update
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:1000/api/v1/update-satus/${orderId}`,
        { status: newStatus },
        { headers }
      );
      alert(res.data.message);
      // Update the status in the local state after successful update
      setOrders((prevOrders) => prevOrders.map((order) => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('Error updating order status:', error);
      alert("Failed to update status!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Loader */}
      {!orders && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}

      {/* No Orders */}
      {orders && orders.length === 0 && (
        <div className="text-center text-lg font-semibold text-gray-700">No orders placed yet.</div>
      )}

      {/* Orders List */}
      {orders && orders.length > 0 && (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order?._id || Math.random()} className="bg-gray-50 p-4 rounded-md shadow-md space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <h3 className="text-xl font-bold text-teal-600">Order ID: {order?._id || "Unknown"}</h3>
                <span
                  className={`text-sm font-semibold mt-2 sm:mt-0 ${order.status === 'Delivered' ? 'text-green-600' :
                    order.status === 'Cancelled' ? 'text-red-600' :
                      order.status === 'Shipped' ? 'text-blue-600' :
                        order.status === 'Pending' ? 'text-yellow-600' : 'text-teal-600'}`}
                >
                  {order.status || "Status Unknown"}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
                {/* Book Details */}
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-teal-500">Book:</h4>
                  <Link to={`/book/${order.book?._id}`} className="text-teal-600 hover:underline">
                    {order.book?.title || "Unknown Book"}
                  </Link>
                </div>

                {/* Quantity */}
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-teal-500">Quantity:</h4>
                  <span className='text-gray-700'>{order.quantity || "N/A"}</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-3">
                  <h4 className="font-semibold text-teal-500">Price:</h4>
                  <span className='text-gray-700'>{order.book?.price || "N/A"}</span>
                </div>
              </div>

              {/* Order Date */}
              <div className="mt-4">
                <p className="text-sm text-gray-500">Placed on: {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Unknown Date"}</p>
              </div>

              {/* Status Update Dropdown */}
              <div className="mt-4">
                <label className="text-teal-600 font-semibold">Update Status:</label>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className="mt-2 w-full sm:w-auto border border-teal-300 rounded-md p-2 bg-white text-gray-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="OrderPlaced">Order Placed</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Shipped">Shipped</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrders;
