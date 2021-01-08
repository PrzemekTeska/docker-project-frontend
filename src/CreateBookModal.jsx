import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Button } from 'react-bootstrap'
import BookService from "./BookService";
import AuthorService from "./AuthorService";
import Select from 'react-select';


const CreateBookModal = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);
    const [book, setBook] = useState({});
    const [selectedOptions, setSelectedOptions] = useState([]);

    useEffect(() => {
        AuthorService.getAuthors().then((res) => {
            const options = res.data.map(d => ({
                "value" : d.id,
                "label" : d.firstName + ' ' + d.lastName
            }))
            setSelectedOptions(options);
        });
    })

    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true)
    };

    useImperativeHandle(ref, () => {
        return {
            handleShow: handleShow
        };
    });

    const submit = () => {
        let author;
        let bookToAdd;
        AuthorService.getAuthorById(book.author).then(res => {
            author = res.data;
            bookToAdd = {title: book.title, author: author, isbn: book.isbn}
            BookService.createBook(bookToAdd);
            handleClose();
            window.location.reload();
        })
    
    };

    const changeTitleHandler = (e) => {
        setBook({...book, title: e.target.value})
    }

    const changeAuthorHandler = (e) => {
        setBook({...book, author: e.value})
    }

    const changeIsbnHandler = (e) => {
        setBook({...book, isbn: e.target.value})
    }

    return (
        <>
            <Modal centered={true} show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Adding a new book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label> Title: </label>
                            <input placeholder="Title" name="title" className="form-control" value={book.title} onChange={changeTitleHandler} />
                        </div>
                        <div className="form-group">
                            <label> Author: </label>
                           <Select options={selectedOptions} onChange={changeAuthorHandler}/>
                        </div>
                        <div className="form-group">
                            <label> ISBN: </label>
                            <input placeholder="ISBN" name="isbn" className="form-control" value={book.isbn} onChange={changeIsbnHandler} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={submit}>
                        Apply
                    </Button>
                    <Button variant="outline-dark" onClick={handleClose}>
                        Close
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

});

export default CreateBookModal;