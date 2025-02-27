const getURLs = () => {
    const baseURL = 'http://localhost:3000/';
    const urls = {};

    urls.books = `${baseURL}books`;
    urls.getBook = (id) => `${baseURL}books/${id}`;
    urls.addReview = (id) => `${baseURL}books/${id}/reviews`;

    return urls;
};

export default getURLs;