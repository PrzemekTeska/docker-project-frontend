import React, { useEffect, useState, useRef } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import AuthorService from './AuthorService';
import CreateAuthorModal from './CreateAuthorModal';
import UpdateAuthorModal from './UpdateAuthorModal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function BookListComponent(props) {

    const ref = useRef(null);
    const updateRef = useRef(null);

    const [authors, setAuthors] = useState([]);

    const { SearchBar } = Search;
    const buttons = (row) => (
        <>
            <button onClick={() => { updateRef.current.handleShow(row) }} className="btn btn-primary" id="editButton">Edit</button>
            <button style={{ marginLeft: '8px' }} onClick={() => { submit(row.id) }} className="btn btn-danger" id="deleteButton">Delete</button>
        </>
    )

    const submit = (id) => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure? All the books from this author will be deleted as well !',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteAuthor(id)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const deleteAuthor = (id) => {
        AuthorService.deleteAuthor(id).then((res => {
            if (res.status === 200) {
                window.location.reload();
            }
            else alert("Server did not respond with status 200")
        }));


    }

    const redirectToBooks = () => {
        props.history.push("/books");
    }

    const columns = [{
        dataField: 'id',
        text: 'Author ID',
        headerStyle: (colum, colIndex) => {
            return { width: "4%", textAlign: 'center' };
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
            return { width: "6%", textAlign: 'center' };
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
                <UpdateAuthorModal ref={updateRef} />
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
                                <button style={{ float: "left" }} className="btn btn-primary" onClick={() => ref.current.handleShow()}>Add author</button>
                                <button style={{ float: "left", marginLeft: "10px" }} className="btn btn-primary" onClick={redirectToBooks}>Books</button>
                                <br />
                                <div>
                                    <div id="search-bar-div">
                                        <SearchBar id="search-bar" {...props.searchProps}
                                            placeholder="Search for an author" />
                                    </div>
                                </div>
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