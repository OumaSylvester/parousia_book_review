import React, { useState } from 'react';
import { makeRequest } from '../../utils/requests';
import { POST } from '../../utils/constants';
import getURLs from '../../services/urls';
import { Form, Button } from 'react-bootstrap';

const AddReview = ({ book, setShow }) => {
    const [review, setReview] = useState({
        reviewer: '',
        comment: '',
        rating: 1, 
    });
    const [errors, setErrors] = useState({
        reviewer: '',
        comment: '',
        rating: ''
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { reviewer: '', comment: '', rating: '' };

        if (!review.reviewer.trim()) {
            newErrors.reviewer = 'Reviewer name is required';
            valid = false;
        }

        if (!review.comment.trim()) {
            newErrors.comment = 'Comment is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        await makeRequest(getURLs().addReview(book.id), POST, { review })
            .then(response => {
                if (response && response.message) {
                    alert(response.message);
                    setShow(false);
                    book.reviews.push(review);
                    setReview({ reviewer: '', comment: '', rating: 1 });
                } else {
                    console.error('No message found in the response');
                }
            })
            .catch(error => {
                console.error('Error adding review:', error);
            });
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId="reviewer">
                <Form.Label>Reviewer</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Your name" 
                    value={review.reviewer}
                    onChange={(e) => setReview({ ...review, reviewer: e.target.value })}
                    isInvalid={!!errors.reviewer}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.reviewer}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="comment">
                <Form.Label>Comment</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="Enter comment" 
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    isInvalid={!!errors.comment}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.comment}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating (1-5)</Form.Label>
                <div className="d-flex align-items-center">
                    <Button 
                        variant="secondary" 
                        onClick={() => setReview({ ...review, rating: Math.max(1, review.rating - 1) })}
                        disabled={review.rating === 1}
                    >
                        -
                    </Button>

                    <Form.Control 
                        type="text"
                        value={review.rating}
                        readOnly 
                        className="text-center mx-2 w-25"
                    />

                    <Button 
                        variant="secondary" 
                        onClick={() => setReview({ ...review, rating: Math.min(5, review.rating + 1) })}
                        disabled={review.rating === 5}
                    >
                        +
                    </Button>
                </div>
            </Form.Group>

            <Button type="submit" variant="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
};

export default AddReview;
