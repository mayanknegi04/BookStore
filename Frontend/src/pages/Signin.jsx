import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import {authActions} from "../store/auth";
import {useDispatch} from "react-redux";

const SignIn = () => {
  const[values,setValues]=useState({
    username:"",
    password:"",
  });
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const change=(e)=>{
    const{name,value}=e.target;
    setValues({...values,[name]:value});
  }
  const submit=async (e)=>{
    e.preventDefault()
      try{
         if(values.username===""||values.password===""){
          alert("All filelds are required");
         }else{
            const res=await axios.post("http://localhost:1000/api/v1/sign-in",values);

            dispatch(authActions.login());
            dispatch(authActions.changeRole(res.data.role));
            localStorage.setItem("id",res.data.id);
            localStorage.setItem("role",res.data.role);
            localStorage.setItem("token",res.data.token);
            alert(res.data.message);
            navigate("/profile")
           
           }
      }catch(err){
        console.log("error on signup:",err);
        alert(err.response.data.message);
      }
    }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-100 to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg hover:scale-105 transition-all duration-300">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>

        <form className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="text-lg font-semibold text-gray-700">UserName</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-5 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all"
              placeholder="Your username"
              required
              value={values.username}
              onChange={change}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-lg font-semibold text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-5 py-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all"
              placeholder="Your secret password"
              required
              value={values.password}
              onChange={change}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right mt-2">
            < Link to="/forgot-password" className="text-teal-500 font-semibold hover:text-teal-700">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button  onClick={submit}
            type="submit"
            className="w-full py-3 mt-6 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition-all duration-300"
          >
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="text-center mt-4 text-gray-700">
            Don't have an account? 
            <Link to="/sign-up" className="text-teal-500 font-semibold hover:text-teal-700"> Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
