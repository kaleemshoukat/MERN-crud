import React from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {toast} from 'react-toastify';

const Google=()=>{
    const clientId = "605645285993-nr9rm9s9pgbi7fi2kruhji8kfgiqs6tt.apps.googleusercontent.com"

    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
        toast(res)
    };

    return(
        <GoogleLogin
            clientId={clientId}
            buttonText="Sign In"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )
}

export default Google