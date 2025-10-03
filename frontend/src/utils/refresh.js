import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefrshHandler() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/login'){
            document.title = "Login Form | CV";
        }
        else if (location.pathname === '/signup'){
            document.title = "Signup Form | CV";
        }
        else if (location.pathname === '/home'){
            document.title = "Home Page | CV";
        }

        if (localStorage.getItem('token')) {
            if (location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ) {
                navigate('/home', { replace: false });
            }
        }
    }, [location, navigate])

    return (
        null
    )
}

export default RefrshHandler