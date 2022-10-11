import React, {useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
//toaster
import { ToastContainer, toast } from 'react-toastify';
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
//firebase
import { onMessageListener } from "./firebase";

function App() {
    // const auth = useSelector(state => state.auth);
    // console.log(auth)
    // const history=createBrowserHistory();
    // if(!auth || (auth && auth.isLoggedIn===false)) {
    //     history.push('/');
    // }

    function getToken1() {
        const token = localStorage.getItem('token');
        return token;
    }
    const history=createBrowserHistory();
    const token=getToken1();
    if(!token || token==='') {
        history.push('/');
    }

    // onMessageListener()
    //     .then((payload) => {
    //         const { title, body } = payload.data;
    //         toast(title);
    //     })
    //     .catch((err) => {
    //         toast(JSON.stringify(err));
    //     });

    useEffect(()=> {
        navigator.serviceWorker.addEventListener("message", (message) => {
            console.log(message)
            const data=message.data.firebaseMessaging.payload.notification
            toast(data.title+'<br>'+data.body);
        });
    }, [])

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
