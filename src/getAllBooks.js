const books = []; 

const getAllBooks = (request, h) => {
    return {
        status: 'success',
        data: {
            books: books.map(({ id, name, publisher }) => ({ id, name, publisher })),
        },
    };
};

module.exports = getAllBooks;
