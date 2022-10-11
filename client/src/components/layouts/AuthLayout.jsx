import React from "react";
import { Outlet } from 'react-router-dom';

const AuthLayout=()=>{
    return(
        <>
            <Outlet />   {/* nested routes rendered here */}
        </>
    )
}

export default AuthLayout