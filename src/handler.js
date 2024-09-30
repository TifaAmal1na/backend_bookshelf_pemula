let books = []; // Array untuk menyimpan buku
import { nanoid } from 'nanoid'; // Gunakan ES module sintaks untuk impor nanoid

// Kriteria 3: Menambahkan buku
const addBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    // Pastikan 'name' diisi
    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        }).code(400); // Mengembalikan status code 400 jika 'name' tidak diisi
    }

    // Pastikan 'readPage' tidak lebih dari 'pageCount'
    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400); // Mengembalikan status code 400 jika 'readPage' lebih besar dari 'pageCount'
    }

    // Validasi input lainnya jika perlu (misalnya, tipe data)
    if (typeof year !== 'number' || typeof pageCount !== 'number' || typeof readPage !== 'number') {
        return h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Pastikan tahun, pageCount, dan readPage adalah angka',
        }).code(400);
    }

    const id = nanoid();
    const finished = pageCount === readPage;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    books.push(newBook);

    return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
            bookId: id,
        },
    }).code(201); // Mengembalikan status code 201 jika buku berhasil ditambahkan
};


// Kriteria 4: Menampilkan semua buku
const getAllBooks = (request, h) => {
    let filteredBooks = books;

    // Filter by name
    if (request.query.name) {
        const nameQuery = request.query.name.toLowerCase();
        filteredBooks = filteredBooks.filter(book => book.name.toLowerCase().includes(nameQuery));
    }

    // Filter by reading status
    if (request.query.reading) {
        const readingStatus = request.query.reading === '1';
        filteredBooks = filteredBooks.filter(book => book.reading === readingStatus);
    }

    // Filter by finished status
    if (request.query.finished) {
        const finishedStatus = request.query.finished === '1';
        filteredBooks = filteredBooks.filter(book => book.finished === finishedStatus);
    }

    return h.response({
        status: 'success',
        data: {
            books: filteredBooks.map(({ id, name, publisher }) => ({ id, name, publisher })),
        },
    });
};

// Kriteria 5: Menampilkan detail buku
const getBookById = (request, h) => {
    const { id } = request.params;
    const book = books.find(b => b.id === id);

    if (!book) {
        return h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        }).code(404);
    }

    return {
        status: 'success',
        data: {
            book,
        },
    };
};

// Kriteria 6: Mengubah data buku
const updateBook = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    if (!name) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        }).code(400);
    }

    if (readPage > pageCount) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        }).code(400);
    }

    const index = books.findIndex(b => b.id === bookId);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan',
        }).code(404);
    }

    books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt: new Date().toISOString(),
    };

    return {
        status: 'success',
        message: 'Buku berhasil diperbarui',
    };
};

// Kriteria 7: Menghapus buku
const deleteBook = (request, h) => {
    const { id } = request.params;
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan',
        }).code(404);
    }

    books.splice(index, 1);
    return {
        status: 'success',
        message: 'Buku berhasil dihapus',
    };
};

// Ekspor semua handler
export { addBook, getBookById, updateBook, deleteBook, getAllBooks };