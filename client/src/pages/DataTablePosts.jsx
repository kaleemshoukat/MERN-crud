import React, {useEffect, useState } from "react";
import Loader from "../components/Loader";
import { useSelector } from 'react-redux';
import Table from "../components/datatable/Table";
import PostService from "../services/post.service";
//localization
import { useTranslation } from 'react-i18next';

const DataTablePosts = () => {
    const { t } = useTranslation();

    const [itemsCount, setItemsCount] = useState(0);
    const [queryPageIndex, setQueryPageIndex] = useState(0);
    const [queryPageSize, setQueryPageSize] = useState(10);
    const [currentItems, setCurrentItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const table = useSelector(state => state.table);
    // console.log(table)

    useEffect(   async () => {
        //set title
        document.title = 'Posts Datatable';

        setQueryPageIndex(table.queryPageIndex);
        setQueryPageSize(table.queryPageSize);

        const itemOffset = table.queryPageIndex * table.queryPageSize
        const res=await PostService.getAll(table.queryPageSize, itemOffset, table.searchValue);
        const response=res.data;
        console.log(response)

        let items= [];
        response.items.map((item, index) => {
            items.push({
                sr: index,
                id: item._id,
                title: item.title,
                description: item.description,
            })
        })

        setCurrentItems(items);
        setItemsCount(response.itemCount);

        setLoading(true);
    },  [table.queryPageIndex, table.queryPageSize, table.searchValue]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Sr.',
                accessor: 'sr', // accessor is the "key" in the data
            },
            {
                Header: 'Title',
                accessor: 'title',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Action',
                accessor: 'id',
                Cell: ({ cell }) => (
                    <>
                        <button  onClick={() => handleShowEdit(cell.row.values.id)} className="btn btn-primary btn-sm mr-2" type="button">
                            Edit
                        </button>
                        <button  onClick={() => handleShowEdit(cell.row.values.id)} className="btn btn-danger btn-sm mr-2" type="button">
                            Delete
                        </button>
                    </>
                )
            },
        ],
        []
    )

    const data = React.useMemo(
        () => currentItems,
        []
    )

    const handleShowEdit= (id) =>{
        alert(id);
    }

    if(loading===false) return <Loader/>;
    return (
        <div className="col-md-12">
            <div className="col-md-12">
                <h4 className="text-danger">{t('post.posts')}</h4>
            </div>
            <Table columns={columns} data={currentItems} itemsCount={itemsCount} queryPageIndex={queryPageIndex} queryPageSize={queryPageSize} />
        </div>
    );
}

export default DataTablePosts;