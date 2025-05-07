import React, { useEffect } from 'react'
import Footer from './components/footer/Footer'
import Home from './pages/Home'
import Navbar from './components/navbar/Navbar'
import { Routes, Route } from "react-router-dom"
import Books from './pages/Books'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import AboutUs from './pages/AboutUs'
import Profile from './pages/Profile'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourites from './components/Profile/Favourites'
import UserOrderHistory from './components/Profile/UserOrderHistory'
import Settings from './components/Profile/Settings'
import AllOrders from './pages/AllOrders'
import AddBook from './pages/AddBook'
import UpdateBook from './pages/UpdateBook'
const App = () => {

   const dispatch=useDispatch();
   const role=useSelector((state)=>state.auth.role);
   useEffect(()=>{
    if(localStorage.getItem("id") && 
    localStorage.getItem("token") &&
    localStorage.getItem("role")
  ){
     dispatch(authActions.login());
     dispatch(authActions.changeRole(localStorage.getItem("role")));
  }
  },[])
  return (
    <div>
        <Navbar />
         <Routes>
           <Route exact path='/' element={<Home/>}/>
           <Route  path='/books' element={<Books/>}/>
           <Route  path='/cart' element={<Cart/>}/>
           <Route  path='/about-us' element={<AboutUs/>}/>
           <Route  path='/profile' element={<Profile/>}>
             {role==="user"?<Route index element={<Favourites/>}/> : <Route index element={<AllOrders/>}/>}
             {role==="admin" && <Route path="/profile/add-book" element={<AddBook/>}/>}
             <Route path="/profile/order-history" element={<UserOrderHistory/>}/>
             <Route path="/profile/settings" element={<Settings/>}/>
           </Route>
           <Route  path='/sign-in' element={<Signin/>}/>
           <Route  path='/sign-up' element={<Signup/>}/>
           <Route  path='update-book/:id' element={<UpdateBook/>}/>
           <Route path='view-book-details/:id' element={<ViewBookDetails/>}></Route>
         </Routes>
        <Footer />
    </div>
  )
}

export default App
