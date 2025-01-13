"use client"
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function ProfilePage() {
    const router = useRouter();
    const logout = async () => {
        try {
          await axios.get("/api/users/logout");
          toast.success("Logout successful");
          router.push("/login");
            
        } catch (error:any) {
            console.log("logout error", error.message);
            toast.error(error.message);
        }
    }

    const [id, setid] = useState("nothing");
    const [name, setName] = useState("nothing");
    const [email, setemail] = useState("nothing");

   

    const userDetails = async () => {
        try {
            const res = await axios.get(`/api/users/me`);
            console.log(res.data);
            setid(res.data.data._id);
            setName(res.data.data.username);
            setemail(res.data.data.email);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Content: This is the profile page</p>
            <hr />
            
            <h2 className="p-2 bg-orange-600 rounded ">User ID: {id === "nothing" ? "Nothing..." : "Found"}</h2>
            <Link
            className="p-2 bg-orange-600 rounded "
            href={id === "nothing" ? "/profile" : `/profile/${id}`}
            >
            {`${id} - ${name} - ${email}`}
            </Link>
            
            <hr />
            <button
            onClick={logout} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
            <button 
            onClick={userDetails} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">User Details</button>
            
        </div>
    );
}