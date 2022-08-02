import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {config} from "../constants/index";
import {useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar=()=>{
    let navigate = useNavigate();

    const logout= async ()=>{
        const result= await axios.get(process.env.REACT_APP_API_URL+'/logout', config)
        const response= result.data;

        if (response.status){
            sessionStorage.setItem('token', '');
            navigate('/');
        }
    }

    const { i18n } = useTranslation();

    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to="/posts" className="navbar-brand">
                Cruds
            </Link>
            <div className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link to="/posts" className="nav-link">
                        Posts
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/add" className="nav-link">
                        Add Post
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/users" className="nav-link">
                        Users
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/crypto" className="nav-link">
                        Crypto Prices
                    </Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Language
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><button className="dropdown-item" onClick={changeLanguage} value='en'>English</button></li>
                        <li><button className="dropdown-item" onClick={changeLanguage} value='ur'>Urdu</button></li>
                    </ul>
                </li>
                <li className="nav-item" onClick={logout}>
                    <a className="nav-link">
                        Logout
                    </a>
                </li>
            </div>
        </nav>
    );
}

export default Navbar