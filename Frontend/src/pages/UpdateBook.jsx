import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

function UpdateBook() {
  // Get the book ID from the URL
  const { id } = useParams();
  const navigate=useNavigate();
  // Initialize bookData with default empty values
  const [bookData, setBookData] = useState({
    url: '',
    title: '',
    author: '',
    language: '',
    desc: '',
    price: '',
    genre: '',
  });

  // Fetch the book data when the component mounts
  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBookData(res.data.data);
        
      } catch (err) {
        console.error('Error fetching book data:', err);
      }
    };

    fetchBookData();
  }, [id]); 
  console.log(bookData);
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-book/${id}`,
        bookData,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            bookid: id,
          },
        }
      );
      alert('Book updated successfully!');
      navigate(`/view-book-details/${id}`);
    } catch (err) {
      console.error('Error updating book:', err);
      alert('Failed to update the book!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-teal-500 mb-6">Update Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-teal-600 font-semibold">Image URL:</label>
          <input
            type="text"
            name="url"
            value={bookData.url}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-teal-600 font-semibold">Title:</label>
          <input
            type="text"
            name="title"
            value={bookData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-teal-600 font-semibold">Author:</label>
          <input
            type="text"
            name="author"
            value={bookData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-teal-600 font-semibold">Language:</label>
          <input
            type="text"
            name="language"
            value={bookData.language}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-teal-600 font-semibold">Description:</label>
          <textarea
            name="desc"
            value={bookData.desc}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-teal-600 font-semibold">Price:</label>
          <input
            type="number"
            name="price"
            value={bookData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
          />
        </div>

        <div>
          <label className="block text-teal-600 font-semibold">Genre:</label>
          <input
            type="text"
            name="genre"
            value={bookData.genre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-700"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-300"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

export default UpdateBook;
