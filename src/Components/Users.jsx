import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import {confirmAlert} from "react-confirm-alert";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import Loader from "./Loader";
import AddUser from "./User/AddUser";

const Users=()=>{
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
                        toast('Post is safe!')
                    }
                }
            ]
        });
    }

    if(loading===false) return <Loader/>;
    return(
        <div className="container">
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">
                Add User
            </button>
            <AddUser />
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
                                <td>{item.profileImage}</td>
                                <td>{item.cgpa.$numberDecimal}</td>
                                <td>{item.country}</td>
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
        </div>
    );
}

export default Users