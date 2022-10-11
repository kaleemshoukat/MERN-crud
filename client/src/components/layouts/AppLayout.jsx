import React from "react";
import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar";
import Footer from "../Footer";

const AppLayout=()=>{
    return(
        <>
            <Navbar />
            <div className="container mt-3">
                <Outlet />   {/* nested routes rendered here */}
            </div>
            <Footer />
        </>
    )
}

export default AppLayout