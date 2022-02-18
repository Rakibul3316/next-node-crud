import Link from "next/link";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Form, Spinner } from "react-bootstrap";

const CreateEvent = () => {

    // const [event, setEvent] = useState({});
    const [form, setForm] = useState({
        title: '',
        description: ''
    });
    console.log(form);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const id = router.query.id;



    useEffect(() => {
        if (isSubmitting) {
            if (Object.keys(errors).length === 0) {
                updateNote();
                // alert('Sumit Success');
            } else {
                setIsSubmitting(false);
            }
        }

        axios.get(`http://localhost:3000/api/notes/${id}`)
            .then(res => {
                setForm(res.data.data);
            })
    }, [errors, isSubmitting]);

    const updateNote = () => {
        fetch(`http://localhost:3000/api/notes/${id}`, {
            method: "PUT",
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
                                            <Form.Label>Event Title</Form.Label>
                                            <Form.Control
                                                value={form.title}
                                                type="text"
                                                error={errors.title ? { content: 'Please Enter Title', pointer: 'below' } : null}
                                                placeholder="Enter The Event Title"
                                                name="title"
                                                onChange={handleChange}
                                            />
                                            <p className="error">{errors.title ? 'Please Enter Title' : null}</p>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label>Event Description</Form.Label>
                                            <Form.Control
                                                value={form.description}
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
                                            Update Event
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