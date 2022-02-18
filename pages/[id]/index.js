import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Modal, Spinner } from "react-bootstrap";

import React from 'react'
import axios from "axios";
import Popup from "../../components/Popup";

const SingleEvent = () => {

    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const id = router.query.id;

    const handleDelete = async () => {
        await fetch(`http://localhost:3000/api/notes/${id}`, {
            method: "DELETE",
        })
        handleClose();
        router.push('/');
    }

    const singleEvent = async () => {
        setLoading(true)
        axios.get(`http://localhost:3000/api/notes/${id}`)
            .then(res => {
                setEvent(res.data.data);
                setLoading(false);
            })
    }

    useEffect(() => {
        singleEvent();
    }, [])

    return (
        <div className="container">
            <div className="row">
                {
                    loading ?
                        <div className="text-center mt-5">
                            <Spinner animation="border" variant="warning" />
                        </div>
                        : <div className="col-md-8 offset-md-2">
                            <div className="single_veiw_event">
                                <h1>{event.title}</h1>
                                <p>{event.description}</p>
                                <div className="text-center mt-5">
                                    <>
                                        <Button variant="danger" onClick={handleShow}>
                                            Delete Event
                                        </Button>

                                        <Modal
                                            show={show}
                                            onHide={handleClose}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Body>
                                                <p className="modal_body_text">Are You Sure To Delete This Event ?</p>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Cancle
                                                </Button>
                                                <Button onClick={handleDelete} variant="danger">OK</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}



export default SingleEvent;