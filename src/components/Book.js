import React from 'react';
import PropTypes from 'prop-types';

/**
 * Component represents a book.
 * It also displays a select input for selecting a shelf.
 * @author [Paulo Ribeiro](https://github.com/paulo-ribeiro)
 * @param {Object} props - properties passed from parent component
 */
function Book(props) {
    const { book, shelf, onChangeShelf } = props;
    const { imageLinks, title, authors } = book;

    /**
     * Captures selected shelf in the select input and calls 
     * onChangeShelf thorugh props.
     * @param {Object} e - input event
     */
    const handleChange = (e) => {
        onChangeShelf(book, e.target.value);
    };

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={
                            {
                                width: 128,
                                height: 193,
                                backgroundImage: `url("${imageLinks && imageLinks.smallThumbnail ? imageLinks.smallThumbnail : ''}")`
                            }
                        }></div>
                    <div className="book-shelf-changer">
                        <select value={shelf} onChange={handleChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">
                    {
                        authors && authors.map((author, index) =>
                            `${author}${authors.length > 1 && index !== (authors.length - 1) && ', '}`)
                    }
                </div>
            </div>
        </li>
    );
}

Book.propTypes = {
    book: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default Book;