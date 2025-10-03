import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import delay from "../utils/delay";

const HomePage = () => {

    const navigate = useNavigate();
    const [data, setdata] = useState(null)
    const btnRef = useRef(null);
    const handleLogout = async (e) => {
        btnRef.current.style.backgroundColor = "green";
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('image');
        navigate('/login');
    }

    const fetchHome = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/login");
            return;
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/home`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
            });
            if (res.status === 404 || res.status === 403) {
                // token invalid/expired
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            const result = await res.json();
            setdata(result);

        } catch (err) {
            console.log("Error fetching home:", err);
            navigate("/login");
            return;
        }
    }

    useEffect(() => {
        fetchHome();
    }, [navigate]);

    if (!data) {
        return (
            <div className="text-3xl text-amber-700 text-center my-10">Loading...</div>
        )
    }

    const name = localStorage.getItem('name') || "None";
    const img = localStorage.getItem('image') || false;
    return (
        <div className="flex flex-col gap-3 items-center justify-start my-15">

            <div className="profile flex items-center gap-4">
                <div className="pic h-16 w-16 rounded-full overflow-hidden flex items-center justify-center bg-black">
                    {img && (
                        <img
                            src={img}
                            alt="profile"
                            className="h-full w-full object-cover rounded-full"
                        />
                    )}
                </div>
                <div className="flex flex-col">
                    <div className="name text-2xl font-medium">{name}</div>
                    <p className="text-gray-700">{data.email}</p>
                </div>
            </div>
            <div className="flex gap-1">
                <strong>User ID:</strong> <p className="bg-gray-300 rounded leading-tight">{data.id}</p>
            </div>
            <button ref={btnRef} className="bg-gray-400 cursor-pointer rounded-3xl px-5 py-1 my-6 border-2 border-green-500" onClick={handleLogout}>Logout</button>

        </div>
    )

}


export default HomePage