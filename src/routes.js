import { addBook, getBookById, updateBook, deleteBook, getAllBooks } from './handler.js'; // Menggunakan sintaks ES module

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks,
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBook,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook,
    },
];

export default routes; // Menggunakan sintaks ekspor ES module