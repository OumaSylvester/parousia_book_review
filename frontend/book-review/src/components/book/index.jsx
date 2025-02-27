import {useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
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

    const  handleAddReview = (e) => {
        setShow(!show);
    }    
    useEffect(() => {
        getBook();
    }, []);

    
    
    return (
        <div className="col-md-4 mb-4">
             <button onClick={()=> navigate('/')}>Home</button>
             <button onClick={handleAddReview}>Add Review</button>
            <div className="card h-100 shadow-sm">
               
                <img
                    src={book.imgName}
                    alt={book.title}
                    className="card-img-top"
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                
                <Modal                
                    show={show}
                    className="modal">
                    <Modal.Header>Add Review</Modal.Header>
                    <Modal.Body>
                        <AddReview book_id={id} setShow={setShow}/>
                    </Modal.Body>

                </Modal>
                <div className="card-body">
                    <h5 className="card-title">{book.title}</h5>
                    <p className="card-text text-muted">By {book.author}</p>
                    <h5>Reviews</h5>
                    <ul>
                        {book.reviews?.length > 0 ? (
                            book.reviews.map((review, index) => (
                                <li key={index}>
                                    <p className="fw-bold">{review?.reviewer}</p>
                                    <p>{review?.comment}</p>
                                    <p>Rating: {review?.rating}</p>
                                </li>
                            ))
                        ) : (
                            <li>No reviews yet</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Book;