import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
//toaster
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//confirm alert css
import 'react-confirm-alert/src/react-confirm-alert.css';
//router
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//browser history
import { createBrowserHistory } from "history";
//routes
import {authRoutes, appRoutes} from "./routes"

function App() {

    function getToken() {
        const token = sessionStorage.getItem('token');
        return token;
    }

    const history=createBrowserHistory();
    const token=getToken();
    if(!token || token==='') {
        history.push('/');
    }

    // console.log('token' ,token);
    // console.log('showComp' ,showComp);

    return(
        <>
            <Router>
                {/*this is routes registry of all app*/}
                <Routes>
                    {authRoutes}
                    {appRoutes}
                </Routes>
            </Router>
            <ToastContainer />     {/* toaster here*/}
        </>
    );
}

export default App;
