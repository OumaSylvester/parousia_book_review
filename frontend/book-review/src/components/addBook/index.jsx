import React, { useState } from "react";
import { makeRequest } from "../../utils/requests";
import { POST } from "../../utils/constants";
import getURLs from "../../services/urls";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
    const [book, setBook] = useState({ title: "", author: "" });
    const [errors, setErrors] = useState({ title: "", author: "" });
    const navigate = useNavigate();

    const validateForm = () => {
      let valid = true;
      const newErrors = { title: "", author: "" };

      if (!book.title.trim()) {
          newErrors.title = "Title is required";
          valid = false;
      }

      if (!book.author.trim()) {
          newErrors.author = "Author is required";
          valid = false;
      }

      setErrors(newErrors);
      return valid;
  };

    const addBook = async () => {   
        if (!validateForm()) return;     
        await makeRequest(getURLs().books, POST, { book: book })
        .then(response => {
            if (response && response.message) {
                setBook({ title: "", author: "" });
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
          <Button variant="secondary" onClick={() => navigate("/")}>Home</Button>
      </div>
      <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5 p-4 shadow rounded bg-light">
              <Form onSubmit={handleSubmit}>
                  {/* Title Field */}
                  <Form.Group className="mb-3" controlId="title">
                      <Form.Label className="fw-bold">Title</Form.Label>
                      <Form.Control 
                          type="text"
                          placeholder="Enter title"
                          className={`p-2 ${errors.title ? "is-invalid" : ""}`} 
                          value={book.title}
                          onChange={(e) => setBook({ ...book, title: e.target.value })}
                      />
                      <Form.Control.Feedback type="invalid">
                          {errors.title}
                      </Form.Control.Feedback>
                  </Form.Group>

                  {/* Author Field */}
                  <Form.Group className="mb-3" controlId="author">
                      <Form.Label className="fw-bold">Author</Form.Label>
                      <Form.Control 
                          type="text"
                          placeholder="Enter author"
                          className={`p-2 ${errors.author ? "is-invalid" : ""}`} 
                          value={book.author}
                          onChange={(e) => setBook({ ...book, author: e.target.value })}
                      />
                      <Form.Control.Feedback type="invalid">
                          {errors.author}
                      </Form.Control.Feedback>
                  </Form.Group>

                  {/* Submit Button */}
                  <div className="d-grid">
                      <Button type="submit" variant="primary">Submit</Button>
                  </div>
              </Form>
          </div>
      </div>
  </div>
    )
}
export default AddBook;