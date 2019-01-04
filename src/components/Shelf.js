import React from 'react';
import BookList from './BookList';
import PropTypes from 'prop-types';

/**
 * Component displays a title and a list o books.
 * @author [Paulo Ribeiro](https://github.com/paulo-ribeiro)
 * @param {Object} props - properties passed from parent component
 */
function Shelf(props) {
    const { title, books, onChangeShelf, onGetBookShelf } = props;

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <BookList books={books} onChangeShelf={onChangeShelf} onGetBookShelf={onGetBookShelf} />
            </div>
        </div>
    );
};

Shelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    onGetBookShelf: PropTypes.func.isRequired
};

export default Shelf;