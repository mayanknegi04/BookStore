import React, { useEffect, useState } from 'react'
import BookCard from '../components/BookCard/BookCard'
import Loader from '../components/Loader/Loader'
import axios from "axios"

function Books() {
  const [books,setBooks]=useState(null);
  useEffect(()=>{
    const fetch=async()=>{
      const res=await axios.get("http://localhost:1000/api/v1/get-all-books");
      setBooks(res.data.data);
    };
    fetch();
  },[])
  return (
    <div className="h-auto px-4 mt-4">
       <h3 className='text-teal-900 text-3xl font-medium'>All Books</h3>
    {!books && <Loader/>}
    <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>{
      books && books.map((items,i)=>(
            <div key={i}>
              <BookCard book={items}/>
            </div>
      ))
      }
    </div>
    </div>
  )
}

export default Books
