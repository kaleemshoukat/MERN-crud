import React, {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import $ from "jquery";
const Joi = require('joi')

const AddUser=()=>{
    const [Values, setValues] = useState({});
    const [image, setImage] = useState();

    const changeHandler = (e) => {
        setValues({ ...Values, [e.target.name]: e.target.value });
    };

    const FileHandler = (e) => {
        // let files = files;
        setImage(e.target.files[0]);
    };

    const handleSubmit =async (event) => {
        event.preventDefault();
        var data = $(".create-form")[0];
        var formData = new FormData(data);

        // const formData = new FormData();
        // formData.append('profileImage', image);
        // formData.append('name', Values.name);
        // formData.append('email', Values.email);
        // formData.append('password', Values.password);
        // formData.append('gender', Values.gender);
        // formData.append('cgpa', Values.cgpa);
        // formData.append('country', Values.country);
        //console.log(formData)

        const schema = Joi.object().keys({
            name: Joi.string().alphanum().max(255).required().empty('').messages({
                'string.alphanum': 'This field can have Only alphabets.',
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.'
            }),
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

        // const validation = schema.validate(formData, options)
        // if(validation.error){
        //     console.log(validation.error)
        //     //toast(validation.error)
        // }
        // else {
            const result=await axios.post('http://localhost:3001/users/add', formData);
            const response=result.data

            if (response.status){
                $(".create-form").reset();
                $("#addUserModal").modal('hide');
                toast(response.message)
            }
            else{
                toast(response.message)
            }
        // }
    };

    return(
        <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form className="create-form" encType="multipart/form-data">
                        <div className="modal-body">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Name</label>
                                        <input type="text" name="name" onChange={changeHandler} className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Email</label>
                                        <input type="text" name="email" onChange={changeHandler} className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Password</label>
                                        <input type="password" name="password" onChange={changeHandler} className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Gender</label>
                                        <div onChange={changeHandler}>
                                            <input type="radio" name="gender" value="Male" /> Male
                                            <input type="radio" name="gender" value="Female" /> Female
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Profile Image</label>
                                        <input type="file" name="profileImage" onChange={FileHandler} className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>CGPA</label>
                                        <input type="number" name="cgpa" onChange={changeHandler} className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Country</label>
                                        <select name="country" onChange={changeHandler} className="form-control">
                                            <option value="">Select Option</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="India">India</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddUser