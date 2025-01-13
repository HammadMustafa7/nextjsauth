"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function UpdatePassword() {
    const router = useRouter();
    const [user, setUser] = useState({ password: "" });
    const [token, setToken] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onUpdatePassword = async () => {
        try {
            setLoading(true);
            await axios.post("/api/users/forgetpassword", { token, password: user.password });
            toast.success("Password updated successfully!");
            setUser({ password: "" }); // Reset form
            router.push("/login");
        } catch (error) {
            const err = error as AxiosError<{ error: string }>;
            const errorMessage = err.response?.data?.error || "Something went wrong. Please try again.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setToken(params.get("token") || "");
    }, []);

    useEffect(() => {
        const isPasswordValid = user.password.length >= 8; // Example validation
        setButtonDisabled(!isPasswordValid);
    }, [user.password]);

    return (
        <div className="flex h-screen flex-col justify-center items-center bg-slate-500 px-4">
            <h1 className="text-3xl font-bold text-white mb-6">Update Password</h1>
            <div className="flex flex-col w-4/5 md:w-2/5 bg-white p-6 rounded-lg shadow-lg">
                <label htmlFor="password" className="text-gray-700">
                    New Password <span className="sr-only">(required)</span>
                </label>
                <input
                    id="password"
                    type="password"
                    className="mb-4 p-3 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="Enter your new password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <Link
                    href={"/login"}
                    className="my-1 block text-center text-slate-500 hover:underline"
                >
                    Back to Login
                </Link>
                <button
                    className={`p-3 text-white rounded transition duration-300 ${
                        buttonDisabled || loading
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-slate-500 hover:bg-slate-600"
                    }`}
                    onClick={onUpdatePassword}
                    disabled={buttonDisabled || loading}
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </div>
        </div>
    );
}
