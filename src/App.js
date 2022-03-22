import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer} from 'react-toastify';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar"
import AddPost from "./Components/AddPost"
import EditPost from "./Components/EditPost"
import Posts from "./Components/Posts"

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
                    </Routes>
                </div>
            </Router>
            <ToastContainer />     {/* toaster here*/}
        </div>
    );
}

export default App;
