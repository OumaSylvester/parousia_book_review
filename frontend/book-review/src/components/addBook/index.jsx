import React, { useState } from "react";
import { makeRequest } from "../../utils/requests";
import { POST } from "../../utils/constants";
import getURLs from "../../services/urls";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [book, setBook] = useState({});
    const navigate = useNavigate();

    const addBook = async () => {        
        await makeRequest(getURLs().books, POST, { book: book })
        .then(response => {
            if (response && response.message) {
                alert(response.message);
            } else {
                console.error('No message found in the response');
            }
        })
            
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook();
    }
    return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold text-primary">Add a New Book</h1>
      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-secondary px-4 py-2 shadow-sm" onClick={() => navigate("/")}>Home</button>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5 p-4 shadow rounded bg-light">
          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label className="fw-bold">Title</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter title" 
                className="p-2" 
                onChange={(e) => setBook({ ...book, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="author">
              <Form.Label className="fw-bold">Author</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter author" 
                className="p-2" 
                onChange={(e) => setBook({ ...book, author: e.target.value })}
              />
            </Form.Group>
            <div className="d-grid">
              <Form.Control 
                type="submit" 
                value="Submit" 
                className="btn btn-primary" 
                onClick={handleSubmit}
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
    )
}
export default AddBook;