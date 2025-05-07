import React,{useEffect,useState} from 'react'
import axios from "axios"
import BookCard from '../BookCard/BookCard'
import { Link } from 'react-router-dom';

function Favourites() {

  const[favBooks,setFavBooks]=useState(null);
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
};


    useEffect(()=>{
        const fetchFavBooks=async()=>{
            const res=await axios.get("http://localhost:1000/api/v1/get-fav-books",{headers});
            setFavBooks(res.data.data);
        }
        fetchFavBooks();
    },[favBooks])
  return (
    <div className="p-4 ">
            {favBooks && favBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favBooks.map((item, i) => (
                        <BookCard key={i} book={item} favourite={true} />
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 bg-gray-100 text-xl text-gray-600 rounded-lg shadow-lg">
                    <p><strong>No favorite books found.</strong></p>
                    <p className="mt-2 text-sm text-blue-500">
                        <Link to="/books">Browse books to add to your favorites</Link>
                    </p>
                </div>
            )}
        </div>
  )
}

export default Favourites
