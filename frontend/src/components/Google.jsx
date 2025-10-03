import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Google = () => {
    const navigate = useNavigate();
    const responseGoogle = async (authResult) => {
        try{
            if (authResult["code"]){
                console.log("api url => ", import.meta.env.VITE_API_URL)
                const resp = await axios.get(`${import.meta.env.VITE_API_URL}/auth/google?code=${authResult.code}`);
                console.log("response: ", resp);
                const {email, name, image} = resp.data.user;
                const token = resp.data.jwtToken;
                localStorage.setItem('name', name)
                localStorage.setItem('token', token)
                localStorage.setItem('image', image)
                navigate('/home');
            }
        }catch(err){
            console.log('Error while Google Login: ', err);
        }
    }
    
    const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
	});


    return (
        <div>
            <div onClick={googleLogin} className="flex items-center gap-4 text-2xl justify-center border-2 border-[#666363] rounded-4xl px-5 py-1 cursor-pointer"><FcGoogle /> Google</div>
        </div>
    )
};

export default Google;