import React from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import {toast} from 'react-toastify';
import AuthDataService from "../../services/auth.service";
import {useNavigate} from 'react-router-dom';

const Google=()=>{
    let navigate = useNavigate();
    const clientId = process.env.REACT_APP_FACEBOOK_CLIENT_ID

    const onLoginSuccess = async (res) => {
        console.log('Login Success:', res.profileObj);

        const obj=res.profileObj
        const data={
            provider: 'google',
            provider_id :obj.googleId,
            name: obj.name,
            email: obj.email,
            imageUrl: obj.imageUrl,
        }

        try{
            let result = await AuthDataService.loginSocial(data);
            const response=result.data
            // console.log(response)

            if (response.status){
                const user=response.data.user
                console.log(user)
                sessionStorage.setItem('token', user.token);

                navigate('/posts');
            }
            else{
                toast(response.message)
            }
        }
        catch (e) {
            toast(e.message)
        }
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