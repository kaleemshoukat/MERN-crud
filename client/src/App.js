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
import {appRoutes} from "./routes"
//localization
import './i18n/config'

function App() {

    function getToken1() {
        const token = sessionStorage.getItem('token');
        return token;
    }

    const history=createBrowserHistory();
    const token=getToken1();
    if(!token || token==='') {
        history.push('/');
    }

    return(
        <div className="main-warp">
            <Router>
                {/*this is routes registry of all app*/}
                <Routes>
                    {appRoutes}
                </Routes>
            </Router>
            <ToastContainer />     {/* toaster here*/}
        </div>
    );
}

export default App;
