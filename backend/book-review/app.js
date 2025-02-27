const express = require('express');
const data = require('./utils/data'); 
const path = require('path')
const cors = require('cors');
const PORT = 3000;


const app = express();
// Middleware to handle JSON requests
app.use(express.json());
//Middleware to handle CORS
app.use(cors());


app.get('/books', async(req, res) => {
    res.status(200).json({'books': data.books, status: 200});
});

app.post('/books', async(req, res) => {
    const book = req.body.book;
    data.books.push({ id: data.books.length + 1, ...book, reviews: []});
    console.log('Books after addition');
    console.log(data.books);
    res.status(201).json({ message: 'Book added successfully', status: 201});
});

app.get('/books/:id', async(req, res) => {
    const id = req.params.id;
    const book = data.books.find(book => book.id === parseInt(id));
    if (book) {
        res.status(200).json({ 'book': book, status: 200});
    } else {
        res.status(404).json({ message: 'Book not found', status: 404});
    }

});

app.post('/books/:id/reviews', async(req, res) => {
    const id = req.params.id;
    const review = req.body.review;
    const book = data.books.find(book => book.id === parseInt(id));
    if (book) {
        book.reviews.push(review);
        console.log('books', data.books);
        res.status(201).json({ message: 'Review added successfully', status: 201});
    } else {
        res.status(404).json({ message: 'Book not found', status: 404});
    }

});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
