import { Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { useRouter } from "next/router";

const Popup = (props) => {
    // console.log(props);

    const [show, setShow] = useState(false);
    const router = useRouter();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = (e) => {
        handleClose();
        router.push('/');
    }

    return (
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
    );
}

export default Popup;

