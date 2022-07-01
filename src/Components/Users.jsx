import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import {confirmAlert} from "react-confirm-alert";
import {toast} from "react-toastify";
import Loader from "./Loader";
import {Button, Modal, ModalBody, ModalHeader, ModalTitle, ModalFooter} from "react-bootstrap";
const Joi = require('joi');

const Users=()=>{
    // pagination
    const itemsPerPage=10
    const [currentItems, setCurrentItems] = useState(null);
    const [itemsCount, setItemsCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % itemsCount;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const paginate=async (itemOffset, itemsPerPage)=>{
        const result= await axios.get('http://localhost:3001/users/list?limit='+itemsPerPage+'&offset='+itemOffset)
        const response= result.data;

        setCurrentItems(response.items);
        setItemsCount(response.itemCount);
        setPageCount(Math.ceil(response.itemCount / itemsPerPage));
    }

    useEffect(   async () => {
        console.log("UseEffect",loading);
        await paginate(itemOffset, itemsPerPage);
        setLoading(true)
        console.log("UseEffect",loading);

    },  [itemOffset, itemsPerPage]);

    //delete row
    const deleteSubmit=(id)=>{
        //alert(id);
        confirmAlert({
            title: 'Confirm Delete!',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        //alert('Click Yes')
                        const result= await axios.delete(`http://localhost:3001/users/delete/${id}`)
                        const response= result.data;

                        if (response.status){
                            await paginate(itemOffset, itemsPerPage);
                            toast(response.message)
                        }
                        else{
                            toast('Something went wrong.')
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {
                        //alert('Click No')
                        toast('User is safe!')
                    }
                }
            ]
        });
    }

    //add model
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setErrors({});
    };
    const handleShow = () => {
        setShow(true);
    }

    //add form submit
    const [errors, setErrors] = useState({});
    const [Values, setValues] = useState({});
    const [image, setImage] = useState();

    const changeHandler = (e) => {
        setValues({ ...Values, [e.target.name]: e.target.value });
    };
    const FileHandler = (e) => {
        // let files = files;
        setImage(e.target.files[0]);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        var data = new FormData(event.target)
        let formData = Object.fromEntries(data.entries())
        console.log(formData)

        const schema = Joi.object().keys({
            name: Joi.string().max(255).required().empty('').messages({
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.'
            }),
            email: Joi.string().max(255).required().empty('').trim(true).messages({
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.',
                'string.email': 'This field has invalid email.',
            }),
            gender: Joi.string().max(255).required().empty('').messages({
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.',
            }),
            profileImage: Joi.any().required().empty('').messages({
                'any.required': 'This field is required.',
            }),
            country: Joi.string().max(255).required().empty('').messages({
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.',
            }),
            cgpa: Joi.number().integer().precision(1).max(4).required().empty('').messages({
                'number.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.',
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
            const result=await axios.post('http://localhost:3001/users/add', formData);
            const response=result.data

            if (response.status){
                event.target.reset();
                setShow(false);
                toast(response.message);
                paginate(itemOffset, itemsPerPage);
            }
            else{
                toast(response.message)
            }
        }
    }

    //Edit model
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => {
        setShowEdit(false);
        setErrors({});
    };
    const handleShowEdit = async (id) => {
        const result=await axios.get('http://localhost:3001/users/edit/'+id);
        const response=result.data

        if (response.status){
            const data=response.data
            setValues({ name: data.name });

            setErrors({});
            setShowEdit(true);
        }
        else{
            toast(response.message)
        }
    }
    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        var data = new FormData(event.target)
        let formData = Object.fromEntries(data.entries())
        console.log(formData)

        const schema = Joi.object().keys({
            name: Joi.string().max(255).required().empty('').messages({
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.'
            }),
            email: Joi.string().max(255).required().empty('').trim(true).messages({
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.',
                'string.email': 'This field has invalid email.',
            }),
            gender: Joi.string().max(255).required().empty('').messages({
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.',
            }),
            profileImage: Joi.any().required().empty('').messages({
                'any.required': 'This field is required.',
            }),
            country: Joi.string().max(255).required().empty('').messages({
                'string.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.',
            }),
            cgpa: Joi.number().integer().precision(1).max(4).required().empty('').messages({
                'number.max': 'This field can have maximum length of {#limit}.',
                'any.required': 'This field is required.',
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
            const result=await axios.post('http://localhost:3001/users/add', formData);
            const response=result.data

            if (response.status){
                event.target.reset();
                setShow(false);
                toast(response.message);
                paginate(itemOffset, itemsPerPage);
            }
            else{
                toast(response.message)
            }
        }
    }


    if(loading===false) return <Loader/>;
    return(
        <div className="container">
            <Button variant="primary" onClick={handleShow}>
                Add User
            </Button>

            {/*Add model*/}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit} className="create-form" encType="multipart/form-data">
                    <Modal.Body>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={changeHandler} className="form-control" />
                                    {errors.name && (<label className="error text-danger">{errors.name}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>Email</label>
                                    <input type="text" name="email" onChange={changeHandler} className="form-control" />
                                    {errors.email && (<label className="error text-danger">{errors.email}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>Password</label>
                                    <input type="password" name="password" onChange={changeHandler} className="form-control" />
                                    {errors.password && (<label className="error text-danger">{errors.password}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>Gender</label>
                                    <div onChange={changeHandler}>
                                        <input type="radio" name="gender" value="Male" /> Male
                                        <input type="radio" name="gender" value="Female" /> Female
                                    </div>
                                    {errors.gender && (<label className="error text-danger">{errors.gender}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>Profile Image</label>
                                    <input type="file" name="profileImage" onChange={FileHandler} className="form-control" />
                                    {errors.profileImage && (<label className="error text-danger">{errors.profileImage}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>CGPA</label>
                                    <input type="number" name="cgpa" onChange={changeHandler} className="form-control" />
                                    {errors.cgpa && (<label className="error text-danger">{errors.cgpa}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>Country</label>
                                    <select name="country" onChange={changeHandler} className="form-control">
                                        <option value="">Select Option</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="India">India</option>
                                    </select>
                                    {errors.country && (<label className="error text-danger">{errors.country}</label>)}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            {/*Edit model*/}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmitEdit} className="create-form" encType="multipart/form-data">
                    <Modal.Body>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={changeHandler} className="form-control" />
                                    {errors.name && (<label className="error text-danger">{errors.name}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>Email</label>
                                    <input type="text" name="email" onChange={changeHandler} className="form-control" />
                                    {errors.email && (<label className="error text-danger">{errors.email}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>Password</label>
                                    <input type="password" name="password" onChange={changeHandler} className="form-control" />
                                    {errors.password && (<label className="error text-danger">{errors.password}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>Gender</label>
                                    <div onChange={changeHandler}>
                                        <input type="radio" name="gender" value="Male" /> Male
                                        <input type="radio" name="gender" value="Female" /> Female
                                    </div>
                                    {errors.gender && (<label className="error text-danger">{errors.gender}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>Profile Image</label>
                                    <input type="file" name="profileImage" onChange={FileHandler} className="form-control" />
                                    {errors.profileImage && (<label className="error text-danger">{errors.profileImage}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>CGPA</label>
                                    <input type="number" name="cgpa" onChange={changeHandler} className="form-control" />
                                    {errors.cgpa && (<label className="error text-danger">{errors.cgpa}</label>)}
                                </div>
                                <div className="col-md-6">
                                    <label>Country</label>
                                    <select name="country" onChange={changeHandler} className="form-control">
                                        <option value="">Select Option</option>
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="India">India</option>
                                    </select>
                                    {errors.country && (<label className="error text-danger">{errors.country}</label>)}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Sr.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Profile Image</th>
                        <th>CGPA</th>
                        <th>Country</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        currentItems.map((item, index) => (
                            //in react make each tr unique by adding id
                            <tr key={item._id}>
                                <td>{index}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.gender}</td>
                                <td><img src={`http://localhost:3001/uploads/${item.profileImage}`} height="50" width="50" alt="img" /></td>
                                <td>{item.cgpa.$numberDecimal}</td>
                                <td>{item.country}</td>
                                <td>
                                    <Button className="btn btn-secondary btn-sm" onClick={() => handleShowEdit(item._id)}>
                                        Edit
                                    </Button>
                                    <button onClick={() => deleteSubmit(item._id)} type="button" className="btn btn-danger btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <div className="pagination">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={1}
                        pageCount={pageCount}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div>
    );
}

export default Users