import React from 'react'
import {Link} from "react-router-dom"
import { IoMdHeartDislike } from 'react-icons/io';
import axios from "axios"

function BookCard({book,favourite}) {
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:book._id
  };
  
  const handleRemoveFromFav=async()=>{
    const res=await axios.delete("http://localhost:1000/api/v1//remove-book-from-fav",{headers});
    alert(res.data.message);
  }

  return (
    <div className='text-white bg-teal-700 rounded p-4 flex flex-col'>
    <Link to={`/view-book-details/${book._id}`}>
        <div className='bg-gradient-to-r from-gray-100 to-blue-200 rounded flex flex items-center justify-center'>
            <img src={book.url} alt="book image" className="h-[30vh]"/>
        </div>
        <h2 className=' text-xl font-semibold'>{book.title}</h2>
        <p >Author:{book.author}</p>
         <p className='font-semibold'>Price:₹{book.price}</p>
     </Link>
         {/* Remove from favorites button */}
         {favourite &&(
         <button
            onClick={handleRemoveFromFav}
            className='mt-4 flex items-center justify-center text-teal-700 bg-white p-3 rounded-full hover:bg-teal-100 transition-all duration-300 ease-in-out'>
            <IoMdHeartDislike size={20} className="mr-2" />
           
          </button>
         )
        }

    </div> 
  )
}

export default BookCard;
