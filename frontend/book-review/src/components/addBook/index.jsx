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

    const onSubmit = (e) => {
        e.preventDefault();
        addBook();
    }
    return (
        <div>
            <h1>Add Book</h1>
            <button onClick={()=> navigate('/')}>Home</button>
            <Form>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" onChange={(e) => setBook({ ...book, title: e.target.value })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="author">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter author"  onChange={(e) => setBook({ ...book, author: e.target.value })}/>
                </Form.Group>
                <Form.Control type="submit" value="Submit" onClick={onSubmit}/>              
            </Form>
        </div>
    )
}
export default AddBook;