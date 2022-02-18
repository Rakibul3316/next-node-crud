import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import SingleEvent from "../components/SingleEvent";
import { Spinner } from "react-bootstrap";
// import { Button, Card } from 'react-bootstrap';


const Index = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(events);
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:3000/api/notes')
      .then(res => {
        setEvents(res.data.data);
        setLoading(false);
      });
  }, []);
  return (
    <div className="container">
      <div className="row">
        {events.map(event => (
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
        ))}
      </div>
    </div>
  )
}

export default Index;