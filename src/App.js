import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookListComponent from './BookListComponent';
import AuthorListComponent from './AuthorListComponent';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Router>
        <div className="container">
          <Route exact path="/authors" component={AuthorListComponent} />
          <Route exact path="/books" component={BookListComponent} />
        </div>
      </Router>

    </div>
  );
}

export default App;
