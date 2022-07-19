import React, {useState, useEffect} from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import {useParams, useNavigate} from 'react-router-dom'

const EditPost=() => {
    const {id} = useParams();
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    let navigate = useNavigate();

    useEffect(async ()=>{
        const result=await axios.get(process.env.REACT_APP_API_URL+'/edit-post/'+id);
        const data=result.data.data
        // console.log(response)

        setTitle(data.title);
        setDescription(data.description);
    }, [])

    const handleSubmit  =async (e) =>{
        e.preventDefault();
        const data={title, description}
        console.log(data)

        const result=await axios.put(`${process.env.REACT_APP_API_URL}/update-post/${id}`, data);
        const response=result.data

        toast(response.message)
        navigate('/')       //navigate to url
    }

    return(
        <div className="col-md-12">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" name="title" onChange={e => setTitle(e.target.value)} value={title} className="form-control"/>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" onChange={e => setDescription(e.target.value)} value={description} className="form-control"></textarea>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditPost;