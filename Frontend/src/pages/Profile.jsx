import React, { useEffect,useState} from 'react'
import Sidebar from '../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from "axios"
import Loader from '../components/Loader/Loader'
function Profile() {
  // const isLoggedIn= useSelector();
  const [profile,setProfile]=useState(null);
  const headers={
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(()=>{
     const fetchUserInfo=async()=>{
         const res=await axios.get("http://localhost:1000/api/v1/get-user-information",{
          headers
         });
         setProfile(res.data.userData);
     };
     fetchUserInfo();
  },[])
  return (
    <div className='bg-teal-600 px-2 md:12 flex flex-col md:flex-row py-8 gap-4 text-white h-auto'>
    {!profile?
    (
      <div className='flex w-full h-[100%] justify-center'>
        <Loader/>
      </div>
    ) :(
      <>
      <div className='w-full md:w-1/6'><Sidebar profileData={profile}/></div>
      <div className='w-full md:w-5/6'>
        <Outlet/>
      </div >
      </>
    )
    }
    </div>
  )
}

export default Profile
