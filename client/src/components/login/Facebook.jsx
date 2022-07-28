import React from "react";
import FacebookLogin from 'react-facebook-login';
import {toast} from 'react-toastify';

const Facebook=()=>{
    const appId = "450453663475394"

    const responseFacebook = (response) => {
        console.log(response);

        if (response.accessToken) {
            //

        } else {
            toast("Something went wrong.")
        }
    }

    return(
        <FacebookLogin
            appId={appId}
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,user_friends"
            callback={responseFacebook}
            icon="fa-facebook"
        />
    )
}

export default Facebook