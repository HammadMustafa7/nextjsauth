"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdatePassword() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onForgetPassword1 = async () => {
        try {
            setLoading(true);
          const responce = await axios.post("/api/users/forgetpassword1", user);

            toast.success("Email send successfully", responce.data);
            router.push("/login");
        } catch (error: any) {
            console.log("login error", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email === "" ) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [user]);

    return (
        <div className="flex h-screen flex-col justify-center items-center bg-slate-500 px-4">
            <h1 className="text-3xl font-bold text-white mb-6">Update Password</h1>
            <hr />
            <div
                className="flex flex-col w-4/5 md:w-2/5 bg-white p-6 rounded-lg shadow-lg"
            >
                <label htmlFor="email">Email</label>
                <input
                    className="mb-4 text-black p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setUser((prev) => ({ ...prev, email: e.target.value }))}
                />
                <button
                    className="p-3 bg-slate-500 text-white rounded hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 transition duration-300"
                    onClick={onForgetPassword1}
                    disabled={buttonDisabled}
                >
                    {loading ? "Loading..." : "Send Email"}
                </button>
            </div>

        </div>
    )


}