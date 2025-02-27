let books = [
    {
        id: 1,
        title: 'Automate the Boring Stuff with Python',
        author: 'Al Sweigat',
        imgName: '/assets/images/book-1.jpg', 
        reviews: [
            { reviewer: 'Molly Ouma', comment: 'A must-read for beginners!', rating: 5 },
            { reviewer: 'Ouma Sylvester', comment: 'A great book for Python enthusiasts!', rating: 4 },
        ],
    },
    {
        id: 2,
        title: 'Python Crash Course',
        author: 'Eric Matthes',
        imgName:'/assets/images/book-2.jpg', 
        reviews: [],
    },
    {
        id: 3,
        title: 'Fluent Python',
        author: 'Luciano Ramalho',
        imgName: '/assets/images/book-1.jpg', 
        reviews: [],
    },
];

module.exports = {
    books
};