import Link from "next/link";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Form, Spinner } from "react-bootstrap";

const CreateEvent = () => {
    const [form, setForm] = useState({
        title: '',
        description: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();

    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                createNote();
                // alert('Sumit Success');
            } else {
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const createNote = () => {
        // await axios.post('http://localhost:3000/api/notes/', {
        //     headers: {
        //         "Accept": "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(form)
        // })
        //     .then((res) => {
        //         return res.data;
        //         console.log('res.data :>> ', res.data);
        //     })
        //     .catch((error) => {
        //         console.log('error :>> ', error);
        //     })
        fetch('http://localhost:3000/api/notes/', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(form)
        })
        router.push('/');
    }


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validate = () => {
        let err = {};

        if (!form.title) {
            err.title = 'Title is required'
        }

        if (!form.description) {
            err.description = 'Description is required'
        }

        return err;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errs = validate();
        setErrors(errs);
        setIsSubmitting(true);
        console.log(form);
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Create Event</h1>
                    <div>
                        {
                            isSubmitting ?
                                <div className="text-center mt-5">
                                    <Spinner animation="border" variant="warning" />
                                </div>
                                : <div className="new_event_form">
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control
                                                type="text"
                                                error={errors.title ? { content: 'Please Enter Title', pointer: 'below' } : null}
                                                placeholder="Enter The Event Title"
                                                name="title"
                                                onChange={handleChange}
                                            />
                                            <p className="error">{errors.title ? 'Please Enter Title' : null}</p>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                name="description"
                                                error={errors.description ? { content: 'Please Enter Description', pointer: 'below' } : null}
                                                as="textarea"
                                                style={{ height: '150px' }}
                                                placeholder="Description"
                                                onChange={handleChange}
                                            />
                                            <p className="error">{errors.title ? 'Please Enter Description' : null}</p>
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            New Event
                                        </Button>
                                    </Form>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CreateEvent;