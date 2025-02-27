import React, { useState, useEffect } from 'react';
import { makeRequest } from '../../utils/requests';
import getURLs from '../../services/urls';
import { GET } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';


const Books = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getBooks = async () => {
        try {
            const response = await makeRequest(getURLs().books, GET);
            if (response && response.books) {
                console.log(response);
                setBooks(response.books);
            } else {
                console.error('No books found in the response');
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookDetail = (bookID) => {
        navigate(`/books/${bookID}`);
    }

    useEffect(() => {
        getBooks();
    }, []);

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Loading books...</p>
            </div>
        );
    }

    return (
        <div className="container mt-5">
        
            <h1 className="text-center mb-4">Books</h1>
            <div className="row">
                <button onClick={()=> navigate('/add-book')}>Add Book</button>
                {books.length > 0 ? (
                    books.map(book => (
                        <div key={book.id} className="col-md-4 mb-4">
                            <div className="card h-100 shadow-sm">
                                {/* <img
                                    src={require(`../../images/book${Math.floor(Math.random() * 10) + 1}.jpg`)}
                                    alt={book.title}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                /> */}
                                <div className="card-body book-card" onClick={(e)=>{handleBookDetail(book.id)}}>
                                    <h5 className="card-title">{book.title}</h5>
                                    <p className="card-text text-muted">By {book.author}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No books available.</p>
                )}
            </div>
        </div>
    );
};

export default Books;