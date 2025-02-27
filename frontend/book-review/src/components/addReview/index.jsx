import React, { useState } from 'react';
import { makeRequest } from '../../utils/requests';
import { POST } from '../../utils/constants';
import getURLs from '../../services/urls';
import { Form } from 'react-bootstrap';

const AddReview = ({book, setShow}) => {
  const [review, setReview] = useState({
        reviewer: '',
        comment: '',
        rating: 0,
    });
    console.log('book_id', book);
  const  handleSubmit = async (e) => {
    e.preventDefault();
    await makeRequest(getURLs().addReview(book.id), POST, {'review': review} )
    .then(response => {
        if (response && response.message) {
            alert(response.message);
            setShow(false);
            book.reviews.push(review);
            setReview({ reviewer: '',
                comment: '',
                rating: 0,});
        } else {
            console.error('No message found in the response');
        }
    })   
    .catch(error => {
        console.error('Error adding review:', error);
    });
  }

  return (
        <Form>
            <Form.Group className="mb-3" controlId="reviewer">
                <Form.Label>Reviewer</Form.Label>
                <Form.Control type="text" placeholder="Your name" onChange={(e) => setReview({ ...review, reviewer: e.target.value })}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control as="textarea" placeholder="Enter comment" onChange={(e) => setReview({ ...review, comment: e.target.value })}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" placeholder="Enter rating" onChange={(e) => setReview({ ...review, rating: e.target.value })}/>
            </Form.Group>
            <Form.Control type="submit" value="Submit" onClick={handleSubmit}/>
        </Form>
    
  )
};
  
export default AddReview;