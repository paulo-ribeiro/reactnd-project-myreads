import React from 'react';
import Shelf from './Shelf';
import PropTypes from 'prop-types';

/**
 * First page presented on the app.
 * Displays the user books ordered by shelf.
 * @author [Paulo Ribeiro](https://github.com/paulo-ribeiro)
 * @param {Object} props - properties passed from parent component
 */
function MyReadsPage(props) {
    const { books, onChangeShelf, onGetBookShelf, onSearchBooks } = props;
    const shelves = [
        { title: "Currently Reading", books: books.filter(book => book.shelf === "currentlyReading") },
        { title: "Want To Read", books: books.filter(book => book.shelf === "wantToRead") },
        { title: "Read", books: books.filter(book => book.shelf === "read") }
    ];

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {
                        shelves.map(shelf =>
                            <Shelf
                                key={shelf.title}
                                title={shelf.title}
                                books={shelf.books}
                                onChangeShelf={onChangeShelf}
                                onGetBookShelf={onGetBookShelf} />)
                    }
                </div>
            </div>
            <div className="open-search">
                <button onClick={() => onSearchBooks()}>Add a book</button>
            </div>
        </div>
    );
}

MyReadsPage.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    onGetBookShelf: PropTypes.func.isRequired
};

export default MyReadsPage;