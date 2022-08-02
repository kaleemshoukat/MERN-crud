import React, {useState, useEffect} from "react";
import ReactPaginate from 'react-paginate';
import {Link} from 'react-router-dom';
import {confirmAlert} from 'react-confirm-alert';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';
import PostDataService from "../services/post.service";
//localization
import { useTranslation } from 'react-i18next';

const Posts = () => {
    const { t } = useTranslation();
    // We start with an empty list of items.
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
        const result= await PostDataService.getAll(itemsPerPage, itemOffset)
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
                        const result= await PostDataService.delete(id)
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
                        toast('Post is safe!')
                    }
                }
            ]
        });
    }

    if(loading===false) return <Loader/>;
    return(
        <div className="table-responsive">
            <div className="col-md-12">
                <h4 className="text-danger">{t('post.posts')}</h4>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Sr.</th>
                    <th>Title</th>
                    <th>Message</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    currentItems.map((item, index) => (
                        //in react make each tr unique by adding id
                        <tr key={item._id}>
                            <td>{index}</td>
                            <td>{item.title}</td>
                            <td>{item.description}</td>
                            <td>
                                <Link to={`/edit/${item._id}`} className="btn btn-primary btn-sm mr-2">Edit</Link>
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
    );
}

export default Posts