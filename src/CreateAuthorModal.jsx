import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Button } from 'react-bootstrap'
import AuthorService from "./AuthorService";

const CreateAuthorModal = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();


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
        let author = {firstName: firstName, lastName: lastName}
        AuthorService.createAuthor(author).then(res=> {
            if(res.status === 201) {
                handleClose();
                window.location.reload();
            }
            else(alert("Server did not respond with status 201"))
        })
    };

    const changeFirstNameHandler = (event) => {
        setFirstName(event.target.value);
    }

    const changeLastNameHandler = (event) => {
        setLastName(event.target.value);
    }

    return (
        <>
            <Modal centered={true} show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Adding a new author</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label> Imię: </label>
                            <input placeholder="Imię" name="firstName" className="form-control" value={firstName} onChange={changeFirstNameHandler} />
                        </div>
                        <div className="form-group">
                            <label> Nazwisko: </label>
                            <input placeholder="Nazwisko" name="lastName" className="form-control" value={lastName} onChange={changeLastNameHandler} />
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

export default CreateAuthorModal;