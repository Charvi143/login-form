import React, {useState, useRef} from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi"; 
import { useForm } from "react-hook-form";
import delay from "../utils/delay" 
import { useLocation, useNavigate } from 'react-router-dom'
import Google from "../components/Google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false); 
    
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting, isValid},
    } = useForm({mode: "onChange",});
    
    const onSubmit = async (data) => {
        let r = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, 
            {method: "POST", headers: { "Content-Type": "application/json",},
             body: JSON.stringify(data)})
        let res = await r.json();
        if (res.status === 400 || !res.success) {
              setError("myform", {message: res.message||'Something wrong happened'})
              return;
        }
        console.log(res)
        localStorage.setItem('name', res.name)
        localStorage.setItem('token', res.jwtToken)
        localStorage.setItem('image', res.image)
        navigate('/home')
    }

    return (
        <GoogleOAuthProvider clientId="1026490617441-atru45csupe1npv2gb2r5k0rhip1jlru.apps.googleusercontent.com">
        <div className="flex items-center justify-center w-full">
                    <div className="form bg-white my-12 w-full md:w-3/4 flex justify-center items-center py-12 max-sm:mx-1">
                        <form action="" onSubmit={handleSubmit(onSubmit)} className="signup flex flex-col justify-center items-center gap-5 w-5/6 md:w-3/4 lg:w-1/2">
                            <div>
                                <h2 className="text-3xl font-medium">Login your account</h2>
                                <p>Don't have an account? <a href="/signup" className="underline">Signup</a></p>
                            </div>
                           
                            <div className="w-full flex flex-col gap-0.5">
                                <p className="text-gray-600 text-[13px]">What's your email?</p>
                                <input {...register("email", {required: {value: true, message: "Email is required"}, minLength: {value:8, message: "Min length is 8"}, pattern: {value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: "Only Gmail addresses are allowed"}, })} type="text" placeholder="Enter your email address" className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-black mx-[2px]" />
                                {errors.email && <p  className="text-red-600 text-[13px]">{errors.email.message}</p>}
                            </div>

                            <div className="w-full flex flex-col gap-0.5">
                                <div className="flex justify-between text-gray-600 text-[13px] items-center"><span>What's your password</span> <span onClick={()=>setShow(!show)} className="flex items-center gap-1 cursor-pointer">{show? <><BiSolidHide/> Hide</> : <><BiSolidShow /> Show</>}</span></div>
                                <input {...register("password", {required: {value: true, message: "Password is required"}, minLength: {value:8, message: "Password must be at least 8 characters long"}, maxLength: {value:150, message: "Max length is 150"}, pattern: {value:  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).+$/, message: "Password must contain at least one letter, one number, and one special character"}, })} type={show ? "text" : "password"} placeholder="Enter your password" className="w-full border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-black mx-[2px]" />
                                 {errors.password && <p  className="text-red-600 text-[13px]">{errors.password.message}</p>}
                            </div>
        
                            <div>
                                <p>By creating an account, you agree to terms the <a href="/terms" className="underline">Terms of use</a> and <a href="/policy" className="underline">Privacy Policy.</a></p>
                                <button disabled={!isValid || isSubmitting} type="submit" className={`w-full bg-[#666363] py-2 my-2 text-white rounded-3xl text-[17px] ${isSubmitting? "bg-gray-400 text-gray-200 cursor-wait": 
                                isValid? "bg-green-600 hover:bg-green-700 text-white":"bg-gray-400 text-gray-200 cursor-not-allowed"}`}>{isSubmitting? "Logging...": "Login your Account"}</button>
                                {errors.myform && <p className="text-red-500 text-[17px]">{errors.myform.message}</p>}
                            </div>
        
        
                            <div className="flex items-center justify-between gap-2 w-full">
                                <div className="bg-[#666363] h-[2px] flex-1"></div>
                                <div className="px-2 text-gray-600">Or continue with</div>
                                <div className="bg-[#666363] h-[2px] flex-1"></div>
                            </div>

                            <Google/>
        
                        </form>
                    </div>
                </div>
                </GoogleOAuthProvider>
    )
}

export default Login