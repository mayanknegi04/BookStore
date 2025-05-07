import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Settings() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    address: { 
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    }
  });
  
  const [loading, setLoading] = useState(false);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-user-information", {
          headers,
        });
        setUser(res.data.userData); 
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  // Handle input change for the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('address')) {
      const addressKey = name.split('.')[1];
      setUser((prevState) => ({
        ...prevState,
        address: { ...prevState.address, [addressKey]: value },
      }));
    } else {
      setUser((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const userData = {
      phoneNumber: user.phoneNumber,
      address: {
         street: user.address.street,
         city: user.address.city,
         state: user.address.state,
         postalCode: user.address.postalCode,
         country: user.address.country
      }
   };
   
    console.log(userData.address);
    try {
      const res = await axios.put('http://localhost:1000/api/v1/update-profile', userData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          id: localStorage.getItem('id')
        }
      });
      alert(res.data.message);
      setLoading(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Error updating profile');
      setLoading(false);
    }
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Update Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md text-gray-900"
            required
            disabled // Username cannot be changed
          />
        </div>

        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md text-gray-900"
            required
            disabled // Email cannot be changed
          />
        </div>

        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber || ''}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md text-gray-900"
          />
        </div>

        {/* Address Fields */}
        <div>
          <label className="block text-gray-700">Street</label>
          <input
            type="text"
            name="address.street"
            value={user.address?.street || ''}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md text-gray-900"
          />
        </div>

        <div>
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="address.city"
            value={user.address?.city || ''}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md text-gray-900"
          />
        </div>

        <div>
          <label className="block text-gray-700">State</label>
          <input
            type="text"
            name="address.state"
            value={user.address?.state || ''}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md text-gray-900"
          />
        </div>

        <div>
          <label className="block text-gray-700">Postal Code</label>
          <input
            type="text"
            name="address.postalCode"
            value={user.address?.postalCode || ''}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md text-gray-900"
          />
        </div>

        <div>
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            name="address.country"
            value={user.address?.country || ''}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-md text-gray-900"
          />
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
