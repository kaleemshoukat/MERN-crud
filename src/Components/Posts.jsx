import React, {useState, useEffect} from "react";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';

const Posts = () => {
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

    useEffect(   async () => {
        console.log("UseEffect",loading);
        const result= await axios.get('http://localhost:3001/posts?limit='+itemsPerPage+'&offset='+itemOffset)
        const response= result.data;

        setCurrentItems(response.items);
        setItemsCount(response.itemCount);
        setPageCount(Math.ceil(response.itemCount / itemsPerPage));
        setLoading(true)
        console.log("UseEffect",loading);

    },  [itemOffset, itemsPerPage]);

    if(loading===false) return "Loading...";
    return(
        <div className="table-responsive">
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
                                <Link to={`/edit/${item._id}`} className="btn btn-primary">Edit</Link>
                                <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">
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