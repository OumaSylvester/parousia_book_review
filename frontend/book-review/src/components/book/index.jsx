import {useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../utils/requests";
import { GET } from "../../utils/constants";
import getURLs from "../../services/urls";
import { useNavigate } from "react-router-dom";
import AddReview from "../addReview";


const Book = () => {
    const [book, setBook] = useState({});
    const [show, setShow] = useState(false);
    const {id} = useParams();
    const navigate = useNavigate();

    const getBook = async () =>{
        await makeRequest(getURLs().getBook(id), GET)
        .then(response => {
            if (response && response.book) {
                setBook(response.book);
            } else {
                console.error('No book found in the response');
            }
        })
        .catch(error => {
            console.error('Error fetching book:', error);
        });
    }
    
    useEffect(() => {
        getBook();
    }, []);    
    
    return (
        <div className="container mt-5">
      <div className="d-flex gap-3 mb-4">
        <Button variant="secondary" onClick={() => navigate("/")} className="px-4 py-2 rounded">
          Home
        </Button>
        <Button variant="primary" onClick={() => setShow(true)} className="px-4 py-2 rounded">
          Add Review
        </Button>
      </div>

      <div className="row g-4 align-items-start">
        <div className="col-md-4">
          <img
            src={book.imgName}
            alt={book.title}
            className="img-fluid rounded shadow"
            style={{ height: "350px", objectFit: "cover" }}
          />
        </div>

        <div className="col-md-8">
          <h2 className="text-primary fw-bold">{book.title}</h2>
          <p className="text-muted fs-5">By <span className="fw-semibold">{book.author}</span></p>
          
          <h5 className="mt-4">Reviews</h5>
          <ul className="list-group list-group-flush">
            {book.reviews?.length > 0 ? (
              book.reviews.map((review, index) => (
                <li key={index} className="list-group-item py-3 border rounded shadow-sm mb-3">
                  <p className="fw-bold mb-1 text-dark">{review?.reviewer}</p>
                  <p className="text-muted mb-1 text-break">{review?.comment}</p>
                  <span className="badge bg-warning text-dark">Rating: {review?.rating}</span>
                </li>
              ))
            ) : (
              <li className="list-group-item py-3 text-center text-muted border rounded shadow-sm">No reviews yet</li>
            )}
          </ul>
        </div>
      </div>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddReview book={book}  setShow={setShow} />
        </Modal.Body>
      </Modal>
    </div>
    );
}

export default Book;