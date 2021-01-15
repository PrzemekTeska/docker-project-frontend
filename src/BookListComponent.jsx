import React, { useState, useEffect, useRef } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BookService from './BookService';
import CreateBookModal from './CreateBookModal';
import UpdateBookModal from './UpdateBookModal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import BookDetailsModal from './BookDetailsModal';

function BookListComponent(props) {
    const ref = useRef(null);
    const updateRef = useRef(null);
    const detailsRef = useRef(null);
    const [books, setBooks] = useState([]);

    const { SearchBar } = Search;
    const buttons = (row) => (
        <>
            <button onClick={() => { updateRef.current.handleShow(row) }} className="btn btn-primary" id="editButton">Edit</button>
            <button style={{ marginLeft: '8px' }} onClick={() => { submit(row.id) }} className="btn btn-danger" id="deleteButton">Delete</button>
            <button style={{ marginLeft: '8px' }} onClick={() => { detailsRef.current.handleShow(row) }} className="btn btn-secondary" id="detailsButton">Details</button>

        </>
    )

    const redirectToAuthors = () => {
        props.history.push("/authors");
    }


    const submit = (id) => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure you want to delete this book?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => deleteBook(id)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const deleteBook = (id) => {
        BookService.deleteBook(id).then((res => {
            if (res.status === 200) {
                window.location.reload();
            }
            else alert("Server did not respond with status 200")
        }));
    }

    function nameFormatter(cell, row) {
        return `${cell.firstName} ${cell.lastName}`
    }

    const columns = [{
        dataField: 'id',
        text: 'Book ID',
        headerStyle: (colum, colIndex) => {
            return { width: "6%", textAlign: 'center' };
        }
    }, {
        dataField: 'title',
        text: 'Title',
        headerStyle: (colum, colIndex) => {
            return { width: "20%", textAlign: 'center' };
        }
    }, {
        dataField: 'author',
        formatter: nameFormatter,
        text: 'Author',
        headerStyle: (colum, colIndex) => {
            return { width: "20%", textAlign: 'center' };
        }
    }, {
        dataField: 'isbn',
        text: 'ISBN',
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
            return { width: "17%", textAlign: 'center' };
        }
    }];

    useEffect(() => {

        BookService.getBooks().then((res) => {

            console.log(res.data);

            setBooks(res.data);
        });
    }, [setBooks])

    return (
        <div id="containerBookList">

            <div id="modalContent">

                <CreateBookModal ref={ref} />
                <UpdateBookModal ref={updateRef} />
                <BookDetailsModal ref={detailsRef} />
            </div>
            <h2 className="text-center">Book list</h2>
            <div className="row">



                <ToolkitProvider
                    keyField="id"
                    data={books}
                    columns={columns}
                    search

                >
                    {
                        props => (
                            <div>
                                <button style={{ float: "left" }} className="btn btn-primary" onClick={() => ref.current.handleShow()}>Add book</button>
                                <button style={{ float: "left" , marginLeft: "10px"}} id="calendarButton" className="btn btn-primary" onClick={redirectToAuthors}>Authors</button>
                                <br />
                                <div id="search-bar-div">

                                    <SearchBar id="search-bar" {...props.searchProps}
                                        placeholder="Search for a book" />
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

                {/* <h3 id="searchError">{searchError}</h3> */}
            </div>
        </div>
    );
}

export default BookListComponent;