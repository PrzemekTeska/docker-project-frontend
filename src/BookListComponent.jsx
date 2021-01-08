import React, { useState, useEffect, useRef } from 'react';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BookService from './BookService';
import CreateBookModal from './CreateBookModal';

function BookListComponent(props) {
    const ref = useRef(null);
    const [books, setBooks] = useState([]);

    const { SearchBar } = Search;
    const buttons = (row) => (
        <>
            {/* <button onClick={() => { ref.current.handleShow(row) }} className="btn btn-primary" id="editButton">Edit</button>
            <button onClick={() => { submit(row.id) }} className="btn btn-danger" id="deleteButton">Delete</button> */}
        </>
    )

    const redirectToAuthors = () => {
        props.history.push("/authors");
    }

    
function nameFormatter(cell, row) {
    return `${cell.firstName} ${cell.lastName}`
}

    const columns = [{
        dataField: 'id',
        text: 'Book ID',
        headerStyle: (colum, colIndex) => {
            return { width: "7%", textAlign: 'center' };
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
            return { width: "20%", textAlign: 'center' };
        }
    }];

    useEffect(() => {

        BookService.getBooks().then((res) => {
            
            console.log(res.data);

            setBooks(res.data);
        });
    }, [setBooks])

    return (
        <div id="containerBookingList">

            <div id="modalContent">

                <CreateBookModal ref={ref} />
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
                                <button className="btn btn-primary" onClick={() => ref.current.handleShow()}>Add book</button>
                                <button id="calendarButton" className="btn btn-primary" onClick={redirectToAuthors}>Authors</button>

                                <SearchBar {...props.searchProps}
                                    placeholder="Search for a book" />
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