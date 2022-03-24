import React, {useRef} from "react";
import axios from "axios";
import {toast} from "react-toastify";

const AddUser=()=>{
    const formRef = useRef();

    const handleSubmit =async (event) => {
        event.preventDefault();
        const data = new FormData(formRef.current);
        let formObject = Object.fromEntries(data.entries())
        //console.log(formObject)

        const result=await axios.post('http://localhost:3001/users/add', formObject);
        const response=result.data

        if (response.status){
            event.target.reset()
            toast(response.message)
        }
        else{
            toast(response.message)
        }
    };

    return(
        <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Add User</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form ref={formRef} encType="multipart/form-data">
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Name</label>
                                        <input type="text" name="name" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Email</label>
                                        <input type="text" name="email" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Password</label>
                                        <input type="password" name="password" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Gender</label>
                                        <input type="text" name="gender" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Profile Image</label>
                                        <input type="file" name="profileImage" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>CGPA</label>
                                        <input type="number" name="cgpa" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label>Country</label>
                                        <select name="country" className="form-control">
                                            <option value="">Select Option</option>
                                            <option value="Pakistan">Pakistan</option>
                                            <option value="India">India</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" onClick={handleSubmit} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddUser