import Link from 'next/link'
import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';

const SingleEvent = ({ event }) => {


    const [loading, setLoading] = useState(false);

    return (
        <>
            {
                loading ?
                    <div className="text-center mt-5">
                        <Spinner animation="border" variant="warning" />
                    </div>
                    : <div className="col-md-4" key={event._id}>
                        <div className="single_event" >
                            <h3 className="event-title">{event.title}</h3>
                            <p className="evnent-content">{event.description}</p>
                            <div className="evnent-btn">
                                <Link href={`/${event._id}`}>
                                    <button className="btn btn-warning me-3">View Event</button>
                                </Link>
                                <Link href={`/${event._id}/edit`}>
                                    <button className="btn btn-primary">Edit</button>
                                </Link>
                            </div>
                            <div className="remove_event">
                                <Link href={`/${event._id}`}>
                                    <button>X</button>
                                </Link>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default SingleEvent;
