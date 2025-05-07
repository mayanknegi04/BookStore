import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../Loader/Loader';
import axios from "axios";
import { GrLanguage } from "react-icons/gr";
import { FaInfoCircle, FaPen, FaBook, FaEdit, FaRupeeSign } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { SlBasket } from "react-icons/sl";
import { MdDelete } from "react-icons/md";

import { useSelector } from 'react-redux';

const ViewBookDetails = () => {

  const { id } = useParams();
  const [book, setBook] = useState(null);

  const isLoggedIn = useSelector((state) => (state.auth.isLoggedIn));
  const role = useSelector((state) => (state.auth.role));
  const navigate=useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
      setBook(res.data.data);
    };
    fetch();
  }, [id]);
   
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:id,
};
  const handleFavourite=async (e)=>{
      const res=await axios.put("http://localhost:1000/api/v1/add-book-to-fav",{},{headers})
     alert(res.data.message);
  } 
  const handleAddToCart=async()=>{
    const res=await axios.put("http://localhost:1000/api/v1/add-book-to-cart",{},{headers})
    alert(res.data.message);
  }

  const handleDeleteBook=async()=>{
    const res=await axios.delete("http://localhost:1000/api/v1/delete-book",{headers});
    alert(res.data.message);
    navigate("/books")
  }
  return (
    <>
  {!book && <div><Loader /></div>}

  {book && (
    <div className='min-h-screen bg-gradient-to-r from-blue-100 to-teal-200 py-8'>
      <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-center bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105'>
        
        {/* Left section (book image and buttons) */}
        <div className='flex flex-col lg:flex-row lg:w-1/2 p-6'>
          <div className='w-full lg:w-1/2'>
            <img 
              src={book.url} 
              alt="book image" 
              className='rounded-lg shadow-xl h-[60vh] object-cover transition-transform transform hover:scale-105'
            />
          </div>

          {/* Buttons for user/admin */}
          {(isLoggedIn && role === "admin") && (
            <div className='flex flex-col space-y-4 mt-4 lg:mt-0 lg:m-auto lg:ml-4'>
              {/* Edit Book */}
              <Link to={`/update-book/${id}`}
                className='flex items-center justify-center bg-teal-500 text-white p-3 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:bg-teal-600 hover:scale-110'
                
              >
                <FaEdit size={28} />
              </Link>

              {/* Delete Book */}
              <button
                className='flex items-center justify-center bg-teal-500 text-white p-3 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:bg-teal-600 hover:scale-110'
                onClick={handleDeleteBook}
              >
                <MdDelete size={28} />
              </button>
            </div>
          )}

          {(isLoggedIn && role === "user") && (
            <div className='flex flex-col space-y-4 mt-4 lg:mt-0 lg:m-auto lg:ml-4'>
              {/* Add to fav Button */}
              <button
                className='flex items-center justify-center bg-teal-500 text-white p-3 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:bg-teal-600 hover:scale-110' 
                onClick={handleFavourite}
              >
                <IoMdHeart size={28} />
              </button>

              {/* Add to cart Button */}
              <button
                className='flex items-center justify-center bg-teal-500 text-white p-3 rounded-full shadow-md transform transition-all duration-300 ease-in-out hover:bg-teal-600 hover:scale-110' 
                onClick={handleAddToCart}
              >
                <SlBasket size={28} />
              </button>
            </div>
          )}
        </div>

        <div className="ml-20 w-px bg-teal-200 hidden lg:block mx-4"></div>

        {/* Right section (book details) */}
        <div className='lg:w-1/2 p-6'>
          <h1 className='text-4xl font-extrabold text-gray-800 flex items-center mb-6'>
            <FaBook className='mr-3 text-teal-600' size={32} />
            {book.title}
          </h1>

          <p className='text-xl text-gray-700 flex items-center mb-4'>
            <FaPen className='mr-3 text-teal-500' size={24} />
            <span className='font-semibold'>{book.author}</span>
          </p>

          <p className='text-lg text-teal-600 flex items-center mb-4'>
            <FaInfoCircle className='mr-3 text-teal-500' size={24} />
            <span className='italic'>{book.desc}</span>
          </p>

          <p className='text-lg text-teal-800 flex items-center mb-4'>
            <GrLanguage className='mr-3 text-teal-500' size={24} />
            {book.language}
          </p>
          <p className='text-lg text-gray-800 flex items-center text-xl '>
            <FaRupeeSign className='mr-3 text-teal-500' size={24} />
            <span className='font-semibold'>{book.price}</span>
          </p>
        </div>
      </div>
    </div>
  )}
</>

  );
};

export default ViewBookDetails;
