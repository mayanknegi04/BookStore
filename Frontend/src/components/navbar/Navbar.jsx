import React, { useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import {useSelector} from "react-redux";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { title: "Home", link: "/" },
    { title: "About us", link: "/about-us" },
    { title: "Books", link: "/books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    {title:"Admin Profile",link:"/profile"}
  ];
   
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn);

 const role=useSelector((state)=>state.auth.role)
if(isLoggedIn===false){
  links.splice(3,3);
}
if(isLoggedIn===true && role==="user"){
  links.splice(5,1);
}
if(isLoggedIn===true && role==="admin"){
  links.splice(3,2);
}
  return (
    <>
      <nav className='flex items-center justify-between bg-teal-800 text-white px-8 py-3 z-20'>
        <div>
          <Link to="/">
            <h1 className='text-3xl font-bold text-teal-400 transition-all duration-300 cursor-pointer transform hover:scale-105'>
              BookyVerse
            </h1>
          </Link>

        </div>
        <div className=' flex items-center gap-4'>
          <div className='hidden md:flex gap-4 items-center'>
            {links.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                className={`nav-links text-white hover:text-teal-400 transition-all duration-300 ${item.title === "Profile" || item.title === "Admin Profile" ? "profile-link" : ""}`}
              >
                {item.title}
              </Link>
            ))}
          </div>
         
             {isLoggedIn===false &&  <div className='hidden md:flex gap-4'> <Link to="sign-in" className="px-4 sign-in-btn px-2 py-1  ">
              SignIn
            </Link>
            <Link to="sign-up" className="px-4 sign-up-btn px-2 py-1 bg-teal-600 text-white rounded ">
              SignUp
            </Link></div>}
          
          <button onClick={() => setMenuOpen(!menuOpen)} className='md:hidden'><RxHamburgerMenu />
          </button>
        </div>

      </nav>

      {/* mobile navigation */}
      <div className={`md:hidden  absolute top-0 right-0 bg-teal-800 h-[94%] w-[30%] z-10  ${menuOpen ? 'block' : 'hidden'}`}>
        <button onClick={() => setMenuOpen(false)} className='absolute top-4 right-4 text-white text-2xl'>
          <IoClose />
        </button>

        <div className='mt-10 flex flex-col items-center justify-center h-[75%]'>
          
          {isLoggedIn===false &&(<> <Link to="sign-in" className=" mb-5 px-4 sign-in-btn px-2 py-1  text-white">
            SignIn
          </Link>
          <Link to="sign-up" className="mb-5 px-4 sign-up-btn px-2 py-1 bg-teal-600 text-white rounded ">
            SignUp
          </Link></>)}
          {links.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className={`mb-5 nav-links text-white hover:text-teal-400 transition-all duration-300 ${item.title === "Profile" ||item.title==="Admin Profile" ? "profile-link" : ""}`}
            >
              {item.title}
            </Link>
          ))}
        </div>
    
      </div>

    </>
  );
};
export default Navbar;
