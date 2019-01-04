import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './services/BooksAPI';
import './App.css';
import MyReadsPage from './components/MyReadsPage';
import SearchPage from './components/SearchPage';

/**
 * Main component of the App.
 * @author [Paulo Ribeiro](https://github.com/paulo-ribeiro)
 */
class BooksApp extends Component {
    state = {
        books: []
    };

    /**
     * Get books from the Books API and updates the component state.
     */
    getBooks = () => {
        BooksAPI.getAll().then(books => this.setState({ books }));
    }

    componentDidMount() {
        this.getBooks();
    }

    /**
     * Uses the update method from Books API to update a book shelf.
     * @param {Object} book
     * @param {string} shelf
     */
    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then((res) => this.getBooks());
    }

    /**
     * Return shelf if book is in one, otherwise returns "none".
     * @param {Object} book
     */
    getBookShelf = (book) => {
        const bookFound = this.state.books.find(item => item.id === book.id);
        return bookFound ? bookFound.shelf : "none";
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={({ history }) => {
                    return <MyReadsPage
                        onSearchBooks={() => history.push("/search")}
                        onChangeShelf={this.changeShelf}
                        onGetBookShelf={this.getBookShelf}
                        books={this.state.books} />
                }} />
                <Route path="/search" render={() => {
                    return <SearchPage
                        onChangeShelf={this.changeShelf}
                        onGetBookShelf={this.getBookShelf} />
                }} />
            </div>
        );
    }
}

export default BooksApp;
