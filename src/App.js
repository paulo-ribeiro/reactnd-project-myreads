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
        books: [],
        loading: true
    };

    async componentDidMount() {
        const books = await BooksAPI.getAll();
        this.setState({ books, loading: false });
    }

    /**
     * Uses the update method from Books API to update a book shelf.
     * @param {Object} book
     * @param {string} shelf
     */
    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf);

        book.shelf = shelf;

        this.setState(prevState => ({
            books: prevState.books.filter(b => b.id !== book.id).concat([book])
        }));
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
                    return this.state.loading === true 
                    ? <h3>Loading...</h3>
                    : <MyReadsPage
                        onSearchBooks={() => history.push("/search")}
                        onChangeShelf={this.changeShelf}
                        onGetBookShelf={this.getBookShelf}
                        books={this.state.books} />
                }} />
                <Route path="/search" render={() => {
                    return this.state.loading === true
                    ? <h3>Loading...</h3>
                    : <SearchPage
                        onChangeShelf={this.changeShelf}
                        onGetBookShelf={this.getBookShelf} />
                }} />
            </div>
        );
    }
}

export default BooksApp;
