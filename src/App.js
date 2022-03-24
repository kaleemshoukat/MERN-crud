import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
//toaster
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//confirm alert css
import 'react-confirm-alert/src/react-confirm-alert.css';
//router
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//components
import Navbar from "./Components/Navbar"
import AddPost from "./Components/AddPost"
import EditPost from "./Components/EditPost"
import Posts from "./Components/Posts"
import Users from "./Components/Users"

function App() {
    return(
        <div>
            <Router>
                <Navbar />

                {/*this is routes registry of all app*/}
                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={ <Posts /> } />
                        <Route exact path="/add" element={ <AddPost /> } />
                        <Route exact path="/edit/:id" element={ <EditPost /> } />
                        <Route exact path="/users" element={ <Users /> } />
                    </Routes>
                </div>
            </Router>
            <ToastContainer />     {/* toaster here*/}
        </div>
    );
}

export default App;
