import React, { useEffect } from "react";
import { useTable, useSortBy, usePagination, useFilters, useGlobalFilter } from "react-table";
import {useDispatch} from "react-redux";
import {tableConstants} from '../../constants';

const Table = ({ columns, data, itemsCount, queryPageIndex, queryPageSize }) => {
    const dispatch = useDispatch();

    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        setFilter,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data: data,
            initialState: {
                pageIndex: queryPageIndex,
                pageSize: queryPageSize,
            },
            manualPagination: true, // Tell the usePagination hook that we'll handle our own data fetching. This means we'll also have to provide our own pageCount.
            pageCount: Math.ceil(itemsCount / queryPageSize),
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        useSortBy,
        usePagination
    );

    useEffect(() => {
        dispatch({ type: tableConstants.PAGE_CHANGED, payload: pageIndex });
    }, [pageIndex]);

    useEffect(() => {
        dispatch({ type: tableConstants.PAGE_SIZE_CHANGED, payload: pageSize });
        gotoPage(0);
    }, [pageSize, gotoPage]);

    // useEffect(() => {
    //     if (data?.count) {
    //         dispatch({
    //             type: tableConstants.TOTAL_COUNT_CHANGED,
    //             payload: data.count,
    //         });
    //     }
    // }, [data?.count]);

    const handleChange = (e) => {
        //console.log(e.target.value);
        gotoPage(0);
        dispatch({ type: tableConstants.SEARCH_VALUE_CHANGED, payload: e.target.value });
    }

    return (
        <div className="table-responsive">
            <pre>
                <code>
                {JSON.stringify(
                    {
                        pageIndex,
                        pageSize,
                        pageCount,
                        canNextPage,
                        canPreviousPage,
                    },
                    null,
                    2
                )}
                </code>
            </pre>
            <div className="col-md-12">
                <input className="mb-2" placeholder="Filter On Page"
                   onChange={e => {
                        setGlobalFilter(e.target.value);
                    }}
                />
            </div>
            <div className="col-md-12">
                <input className="mb-2" onChange={handleChange} placeholder="Filter Server Side" />
            </div>
            <table {...getTableProps()} className="table table-bordered table-striped">
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                                {column.render('Header')}
                                <span>
                                   {column.isSorted
                                       ? column.isSortedDesc
                                           ? '🔽'
                                           : '🔼'
                                       : ''}
                                </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td {...cell.getCellProps()} >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default Table;