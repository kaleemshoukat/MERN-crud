import React from "react";
import {useSelector} from "react-redux";

const token = () => {
    const auth = useSelector(state => state.auth);
    console.log(auth)

    let token=''
    if (auth && auth.isLoggedIn===true){
        token=auth.token
    }

    return token
};

export default token