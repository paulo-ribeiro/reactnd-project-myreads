import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

/**
 * Component presents a list of books.
 * @author [Paulo Ribeiro](https://github.com/paulo-ribeiro)
 * @param {Object} props - properties passed from parent component 
 */
function BookList(props) {
    const { books, onChangeShelf, onGetBookShelf } = props;

    return (
        <ol className="books-grid">
            {
                books.map(book => 
                    <Book key={book.id} shelf={onGetBookShelf(book)} book={book} onChangeShelf={onChangeShelf}/>)
            }
        </ol>
    );
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    onGetBookShelf: PropTypes.func.isRequired
};

export default BookList;