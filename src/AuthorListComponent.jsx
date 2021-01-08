import React, { useEffect, useState, useRef } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AuthorService from './AuthorService';
import CreateAuthorModal from './CreateAuthorModal';

function BookListComponent(props) {

    const ref = useRef(null);

    const [authors, setAuthors] = useState([]);

    const { SearchBar } = Search;
    const buttons = (row) => (
        <>
            {/* <button onClick={() => { ref.current.handleShow(row) }} className="btn btn-primary" id="editButton">Edytuj</button>
            <button onClick={() => { submit(row.id) }} className="btn btn-danger" id="deleteButton">Usuń</button> */}
        </>
    )

    const redirectToBooks = () => {
        props.history.push("/books");
    }

    const columns = [{
        dataField: 'id',
        text: 'Author ID',
        headerStyle: (colum, colIndex) => {
            return { width: "5%", textAlign: 'center' };
        }
    }, {
        dataField: 'firstName',
        text: 'First name',
        headerStyle: (colum, colIndex) => {
            return { width: "15%", textAlign: 'center' };
        }
    }, {
        dataField: 'lastName',
        text: 'Last name',
        headerStyle: (colum, colIndex) => {
            return { width: "15%", textAlign: 'center' };
        }
    },
    {
        text: 'Actions',
        isDummyField: true,
        formatter: (cell, row, rowIndex) => {
            return buttons(row);
        },
        headerStyle: (colum, colIndex) => {
            return { width: "20%", textAlign: 'center' };
        }
    }];

    useEffect(() => {
        
            AuthorService.getAuthors().then((res) => {
                setAuthors(res.data);
                console.log(res.data);
            });
    }, [setAuthors])

    return (
        <div id="containerAuthorList">

            <div id="modalContent">

                <CreateAuthorModal ref={ref} />
            </div>
            <h2 className="text-center">Authors list</h2>
            <div className="row">



                <ToolkitProvider
                    keyField="id"
                    data={authors}
                    columns={columns}
                    search

                >
                    {
                        props => (
                            <div>
                                <button className="btn btn-primary" onClick={() => ref.current.handleShow()}>Add author</button>
                                <button className="btn btn-primary" onClick={redirectToBooks}>Books</button>

                                <SearchBar {...props.searchProps}
                                    placeholder="Search for an author" />
                                <hr />
                                <BootstrapTable
                                    {...props.baseProps}
                                    pagination={paginationFactory()}
                                    hover
                                />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        </div>
    );
}

export default BookListComponent;