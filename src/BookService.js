import axios from 'axios';

const BOOK_API_BASE_URL = "http://localhost:8080/api/books";

class BookService {

    getBooks() {
        return axios.get(BOOK_API_BASE_URL);
    }

    createBook(book) {
        return axios.post(BOOK_API_BASE_URL, book);
    }

    updateBook(book, id) {
        return axios.put(BOOK_API_BASE_URL + "/" + id, book);
    }

    deleteBook(id) {
        return axios.delete(BOOK_API_BASE_URL + "/" + id);

    }

    getBookDetails(isbn) {
        return axios.get("https://openlibrary.org/isbn/" + isbn + ".json")
    }
}

export default new BookService()