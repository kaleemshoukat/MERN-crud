import React, {useState, useEffect} from "react";
import {toast} from 'react-toastify';
import {useParams, useNavigate} from 'react-router-dom';
import PostDataService from "../services/post.service";
//localization
import { useTranslation } from 'react-i18next';

const EditPost=() => {
    const {t} = useTranslation();
    const {id} = useParams();
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    let navigate = useNavigate();

    useEffect(async ()=>{
        //set title
        document.title = 'Edit Post';

        const result=await PostDataService.edit(id);
        const data=result.data.data
        // console.log(response)

        setTitle(data.title);
        setDescription(data.description);
    }, [])

    const handleSubmit  =async (e) =>{
        e.preventDefault();
        const data={title, description}
        console.log(data)

        const result=await PostDataService.update(id, data);
        const response=result.data

        toast(response.message)
        navigate('/posts')       //navigate to url
    }

    return(
        <div className="col-md-12">
            <div className="col-md-12">
                <h4 className="text-danger">{t('post.edit post')}</h4>
            </div>
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