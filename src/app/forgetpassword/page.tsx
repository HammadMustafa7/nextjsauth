"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdatePassword() {
    const router = useRouter();
    const [user, setUser] = useState({
        password: "",
    });
    const [token, setToken] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onUpdatePassword = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/forgetpassword", { token, password: user.password });
            console.log("Password updated successfully");
            router.push("/login");
        } catch (error: any) {
            // Handle errors
            console.error("Password update error:", error);
            const errorMessage =
                error.response?.data?.error || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        const urlToken = window.location.search.split("=")
        [1];
        setToken(urlToken || "");
    }, []);



    useEffect(() => {
        if (user.password === "") {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [user.password]);

    return (
        <div className="flex h-screen flex-col justify-center items-center bg-slate-500 px-4">
            <h1 className="text-3xl font-bold text-white mb-6">Update Password</h1>
            <hr />
            <div className="flex flex-col w-4/5 md:w-2/5 bg-white p-6 rounded-lg shadow-lg">
                <label htmlFor="password" className="text-gray-700">
                    New Password
                </label>
                <input
                    className="mb-4 p-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />
                <Link
                    href={"/login"}
                    className="my-1 block bg-gray-300 hover:underline text-center"
                >
                    Login
                </Link>
                <button
                    className="p-3 bg-slate-500 text-white rounded hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300"
                    onClick={onUpdatePassword}
                    disabled={buttonDisabled}
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </div>
        </div>
    );
}
