"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
    
        try {
         const res =  await axios.post("/api/users/verifyemail", {token});
         console.log(res.data);
           setVerified(true);
            
        } catch (error: any) {
            setError(true);
            console.log(error);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")
        [1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();  
        }
    }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl text-white py-4">Verify Email</h1>
            <h2 className="text-4xl text-blue-600">
                {token ? `${token}` : "No token found"}
            </h2>

            {
                verified && (
                    <div>
                    <h2 className="text-2xl text-green-600">
                        Email verified
                    </h2>
                    <Link href="/login" className="text-blue-600">
                     Login</Link>
                    </div>
                )
            }
            {error && (
                <div>
                    
                <h2 className="text-2xl text-red-600">
                    Something went wrong
                </h2>
                </div>)}
        </div>
    )


}