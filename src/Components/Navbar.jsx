import {Link} from "react-router-dom";
import React from "react";

const Navbar=()=>{
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">
                Posts
            </Link>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/add" className="nav-link">
                        Add Post
                    </Link>
                </li>
            </div>
        </nav>
    );
}

export default Navbar