import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

function UserOrderHistory() {
  const [orderHistory, setOrderHistory] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-order-history", { headers });
        setOrderHistory(res.data.data);
      } catch (err) {
        console.error("Error fetching order history:", err);
      }
    };

    fetchOrder();
  }, []);

  // Utility function to get the appropriate status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'Shipped':
        return 'bg-blue-100 text-blue-600';
      case 'Delivered':
        return 'bg-green-100 text-green-600';
      case 'OrderPlaced':
        return 'bg-teal-100 text-teal-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Loader while orders are being fetched */}
      {!orderHistory && <Loader />}

      {/* No orders found */}
      {orderHistory && orderHistory.length === 0 && (
        <div className="text-center py-12 bg-gray-100 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold text-gray-600">No Order History</h1>
          <p className="mt-2 text-sm text-blue-500">You haven't placed any orders yet!</p>
        </div>
      )}

      {/* Orders present */}
      {orderHistory && orderHistory.length > 0 && (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Order History</h1>

          {orderHistory.map((order, i) => (
            <div key={i} className="bg-white shadow-md rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Order ID: {order._id}</h2>
              <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>

              {/* Items in the order */}
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700">Items:</h3>
                <div className="space-y-4 mt-2">
                  {order.book ? (
                    <div key={order.book._id} className="flex items-center justify-between space-x-4">
                      <Link to={`/view-book-details/${order.book._id}`} className="flex items-center space-x-4">
                        <img
                          src={order.book.url}
                          alt={order.book.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="ml-4">
                          <p className="font-semibold text-gray-900">{order.book.title}</p>
                          <p className="text-sm text-gray-500">Quantity: {order.quantity}</p>
                        </div>
                      </Link>
                      <div className="flex flex-col items-end">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{order.book.price || 'N/A'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-red-500">Book details unavailable</p>
                  )}
                </div>
              </div>

              {/* Order Status */}
              <div className={`mt-4 flex justify-between items-center p-2 rounded-md ${getStatusColor(order.status)}`}>
                <span className="text-sm font-semibold">{order.status}</span>
                <span className="text-sm font-semibold text-gray-900">
                  Total: ₹{order.book && order.book.price ? order.book.price * order.quantity : 0}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserOrderHistory;
