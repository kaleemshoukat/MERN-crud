import React, {useState} from "react";
import {toast} from 'react-toastify';
import PostDataService from "../services/post.service";
//localization
import { useTranslation } from 'react-i18next';

const AddPost=() => {
    const { t } = useTranslation();
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")

    const handleSubmit  =async (e) =>{
        e.preventDefault();
        const data={title, description}
        console.log(data)
        const result=await PostDataService.create(data);
        const response=result.data

        if (response.status){
            setTitle('');
            setDescription('');
            toast(response.message)
        }
        else{
            toast(response.message)
        }
    }

    return(
        <div className="col-md-12">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="text-danger">{t('post.add post')}</h4>
                    </div>
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

export default AddPost;