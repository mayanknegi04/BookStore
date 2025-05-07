import React, { useEffect, useState } from 'react'
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';
function RecentlyAdded() {
  const [data,setData]=useState();
  useEffect(()=>{
      const fetch =async()=>{
        const res=await axios.get("http://localhost:1000/api/v1/get-recent-books");
       setData(res.data.data);
      };
      fetch();
  },[]);
  return (
    <div className='mt-8 px-8'> 
  <h3 className='text-teal-900 text-3xl font-medium'>Recently Added Books</h3>
    {!data && <Loader/>}
    <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>{
      data && data.map((items,i)=>(
            <div key={i}>
              <BookCard book={items}/>
            </div>
      ))
      }
    </div>
    </div>
  );
}

export default RecentlyAdded
