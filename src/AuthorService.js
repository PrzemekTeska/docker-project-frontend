import axios from 'axios';

const {REACT_APP_URL} = process.env;


const BOOK_API_BASE_URL = REACT_APP_URL+"/api/authors";

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