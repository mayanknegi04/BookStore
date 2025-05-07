import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';  
import { Link, useNavigate} from 'react-router-dom';

function Cart() {
  const [cart, setCart] = useState(null);
  const [total,setTotal]=useState(0);  
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
};
 const navigate=useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:1000/api/v1/get-user-cart', {
        headers
        });
        // console.log(res.data.data);
        setCart(res.data.data); 
      
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    
    fetchCart();
  }, [cart]);  

  useEffect(()=>{
    if(cart && cart.length>0){
      let total=0;
      cart.map((items)=>{
        total+=items.price;
      });
      setTotal(total);
      total=0;
    }
  },[cart]);
  
  const handleRemoveItem=async (itemId)=>{
     const res=await axios.delete(`http://localhost:1000/api/v1/remove-from-cart/${itemId}`, {
        headers
     });
     alert(res.data.message);
  }
  const handlePlaceOrder=async()=>{
    try{
      const res=await axios.post("http://localhost:1000/api/v1/place-order",{order:cart},{headers});
      alert(res.data.message);
      navigate("/profile/order-history")
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="p-4">
      {/* Loader while cart data is loading */}
      {!cart && <Loader />}

      {/* Empty cart state */}
      { cart && cart.length === 0 && (
        <div className="text-center p-8 bg-gray-100 text-xl text-gray-600 rounded-lg shadow-lg h-screen">
          <h1>Your cart is empty!</h1>
          <p className="mt-2 text-sm text-blue-500">
            <Link to="/books">Browse products to add to your cart</Link>
          </p>
        </div>
      )}

      {/* Cart with items */}
      {cart && cart.length > 0 && (
        <div className='min-h-screen h-auto'>
          <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg">
                {/* Cart Item Details */}
                <div className="flex items-center">
                  <img src={item.url} alt={item.name} className="w-20 h-20 object-cover mr-4" />
                  <div>
                    <h2 className="font-medium text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                  
                  </div>
                </div>

                {/* Remove Item Button */}
                <button 
                  onClick={() => handleRemoveItem(item._id)}
                
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
           {/* Total Price and Place Order */}
          <div className="mt-6 flex justify-between items-center p-4 bg-gray-100 rounded-lg">
            <h2 className="font-semibold text-xl">Total: ₹{total}</h2>
            <button 
              onClick={handlePlaceOrder}
              className="bg-teal-700 text-white py-2 px-6 rounded-lg hover:bg-teal-800 transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
        
        
    </div>
  );
}

export default Cart;
