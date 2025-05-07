import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    url: '',
    title: '',
    author: '',
    language: '',
    desc: '',
    price: '',
    genre: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log(bookData);
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:1000/api/v1/add-book', bookData, {
        headers: {
            id:localStorage.getItem('id'),
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Book added successfully!');
      setBookData({
        url: '',
        title: '',
        author: '',
        language: '',
        desc: '',
        price: '',
        genre: '',
      });
    } catch (err) {
      console.error('Error adding book:', err);
      alert('Failed to add the book!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-teal-500 mb-6">Add New Book</h2>
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
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
