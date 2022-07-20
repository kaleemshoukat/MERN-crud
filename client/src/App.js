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
//components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AddPost from "./pages/AddPost"
import EditPost from "./pages/EditPost"
import Posts from "./pages/Posts"
import Users from "./pages/Users"
import Login from "./pages/Login"

function App() {
    const [showComp, setShowComp] = useState(true);

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
        <div>
            <Router>
                {showComp ? <Navbar /> : ''}

                {/*this is routes registry of all app*/}
                <div className="container mt-3">
                    <Routes>
                        <Route exact path="/" element={ <Login setShowComp={setShowComp} /> } />
                        <Route exact path="/posts" element={ <Posts /> } />
                        <Route exact path="/add" element={ <AddPost /> } />
                        <Route exact path="/edit/:id" element={ <EditPost /> } />
                        <Route exact path="/users" element={ <Users /> } />
                    </Routes>
                </div>

                {showComp ? <Footer /> : ''}
            </Router>
            <ToastContainer />     {/* toaster here*/}
        </div>
    );
}

export default App;
