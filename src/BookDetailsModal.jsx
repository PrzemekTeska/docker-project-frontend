import axios from "axios";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Button } from 'react-bootstrap';
import BookService from "./BookService";


const BookDetailsModal = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);
    const [book, setBook] = useState({author: {firstName: "", lastName: ""}});
    const [bookDetails, setBookDetails] = useState({publish_date: " ", revision: " ", number_of_pages: " "});

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = (passedBook) => {
        setShow(true);
        setBook(passedBook);
        setBookDetails({publish_date: "no data", revision: "no data", number_of_pages: "no data"})
        getBookDetails(passedBook.isbn);
        console.log(bookDetails);
    };

    const getBookDetails = (isbn) => {
        BookService.getBookDetails(isbn).then((res => {
            axios.get(res.request.responseURL).then((response => {
                setBookDetails(response.data);
                console.log(response.data)
            }))
        }))
    }

    const getNumberOfPages = () => {
        if(bookDetails.number_of_pages===undefined) return "no data"
        else return bookDetails.number_of_pages;
    }

    const getRevision = () => {
        if(bookDetails.revision===undefined) return "no data"
        else return bookDetails.revision;
    }

    const getPublishDate = () => {
        if(bookDetails.publish_date===undefined) return "no data"
        else return bookDetails.publish_date;
    }

    useImperativeHandle(ref, () => {
        return {
            handleShow: handleShow
        };
    });

    return (
        <>
            <Modal centered={true} show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Book details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <p>Title: {book.title}</p>
                   <p>Author: {book.author.firstName + " " + book.author.lastName}</p>
                   <p>ISBN: {book.isbn}</p>
                   <p>Number of pages: {getNumberOfPages()}</p>
                   <p>Publish date: {getPublishDate()}</p>
                   <p>Revision: {getRevision()}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleClose}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

});

export default BookDetailsModal;