import axios from 'axios';

const BOOK_API_BASE_URL = "http://localhost:8080/api/authors";

class AuthorService {

    getAuthors() {
        return axios.get(BOOK_API_BASE_URL);
    }

    getAuthorById(id) {
        return axios.get(BOOK_API_BASE_URL + '/' + id);
    }

    createAuthor(author) {
        return axios.post(BOOK_API_BASE_URL, author);
    }

    updateAuthor(author, id) {
        return axios.put(BOOK_API_BASE_URL + "/" + id, author);
    }

    deleteAuthor(id) {
        return axios.delete(BOOK_API_BASE_URL + "/" + id);
    }
}

export default new AuthorService()