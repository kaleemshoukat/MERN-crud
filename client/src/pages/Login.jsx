import React, {useState} from "react";
import Joi from "joi";
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import Google from "../components/login/Google";
import AuthDataService from "../services/auth.service";

const Login=() => {
    let navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [Values, setValues] = useState({});

    const changeHandler = (e) => {
        setValues({ ...Values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        var data = new FormData(event.target)
        let formData = Object.fromEntries(data.entries())
        //console.log(formData)

        const schema = Joi.object().keys({
            email: Joi.string().max(255).required().empty('').trim(true).messages({
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.',
                'string.email': 'This field has invalid email.',
            }),
            password: Joi.string().min(3).max(15).required().empty('').trim(true).messages({
                'string.min': 'This field should have a minimum length of {#limit}.',
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.',
            })
        })

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true // remove unknown props
        }

        const validation = schema.validate(formData, options)
        if(validation.error){
            const items=validation.error.details
            const errors = {};
            for (let item of items) {
                errors[item.path[0]] = item.message;
                //toast(`${item.path[0]} ${item.message}`);
            }
            console.log(errors);
            setErrors(errors);
        }
        else {
            try {
                const result=await AuthDataService.login(formData);
                const response=result.data

                if (response.status){
                    event.target.reset();
                    console.log(response);

                    const user=response.data.user
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
        }
    }

    return(
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <div className="card-header bg-dark text-light">Login</div>
                    <div className="card-body bg-light">
                        <form onSubmit={handleSubmit}>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" name="email" onChange={changeHandler} className="form-control" placeholder="Type here..." />
                                    {errors.email && (<label className="error text-danger">{errors.email}</label>)}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" onChange={changeHandler} className="form-control" placeholder="Type here..." />
                                    {errors.password && (<label className="error text-danger">{errors.password}</label>)}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-primary mt-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

                <Google />
                {/*<Facebook />*/}

            </div>
        </div>
    )
}

export default Login;

