import React, { useState } from 'react';
import { makeRequest } from '../../utils/requests';
import { POST } from '../../utils/constants';
import getURLs from '../../services/urls';
import { Form } from 'react-bootstrap';

const AddReview = ({book_id, setShow}) => {
  const [review, setReview] = useState({
        reviewer: '',
        comment: '',
        rating: 0,
    });
    console.log('book_id', book_id);
  const  handleSubmit = async (e) => {
    e.preventDefault();
    console.log('review', review);
    await makeRequest(getURLs().addReview(book_id), POST, {'review': review} )
    .then(response => {
        if (response && response.message) {
            alert(response.message);
            setShow(false);
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
                <Form.Control type="text" placeholder="Enter reviewer" onChange={(e) => setReview({ ...review, reviewer: e.target.value })}/>
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