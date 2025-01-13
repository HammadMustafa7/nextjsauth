"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function Signup() {
  const router = useRouter();
    const [user , setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {

      try {
        setLoading(true);
       const responce = await axios.post("/api/users/signup", user);
       console.log("signup responce", responce.data);
       router.push("/login");
        
      } catch (error:any) {
        console.log("signup error", error.message);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {  
            setButtonDisabled(true);
            
        }
      }, [user]);

    return (
        <div className="flex   h-screen flex-col justify-center items-center bg-slate-500 px-4">
  <h1 className="text-3xl font-bold text-white mb-6">{loading ? "Processing" : "Signup"}</h1>
  <div className="flex flex-col w-4/5 md:w-2/5 bg-white p-6 rounded-lg shadow-lg">
  <label htmlFor="username">Username</label>
    <input 
      className="mb-4 p-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500" 
      id="username"
      type="text" 
      placeholder="Username" 
      value={user.username}
      onChange={(e) => setUser((prev) => ({ ...prev, username: e.target.value }))}
    />
    <label htmlFor="email">Email</label>
    <input 
      className="mb-4 p-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500" 
      id="email"
      type="email" 
      placeholder="Email" 
      onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
    />
    <label htmlFor="password">Password</label>
    <input 
      className="mb-4 p-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500" 
      id="password"
      type="password" 
      placeholder="Password" 
      onChange={(e) => setUser((prev) => ({ ...prev, password: e.target.value }))}
    />
    <button 
      className="p-3 bg-slate-500 text-white rounded hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300" 
      onClick={onSignup}
    >
      {buttonDisabled ? "No signup" : "Signup"}
    </button>
    <Link href={"/login"} className="mt-4 bg-yellow-300 hover:underline text-center ">Already have an account? Login</Link>
  </div>
  
</div>

    )
}