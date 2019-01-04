import React, { Component } from 'react';
import * as BooksAPI from '../services/BooksAPI';
import SearchBar from './SearchBar';
import BookList from './BookList';
import PropTypes from 'prop-types';

/**
 * Search page of the app.
 * Displays the books when inserted a valid query in the search bar.
 * It also allows the user to add new book to MyReadsPage.
 * @author [Paulo Ribeiro](https://github.com/paulo-ribeiro)
 */
class SearchPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: []
        };
    }

    /**
     * Uses the method search from the Books API to get books that matches
     * query typed in the SearchBar input.
     * @param {string} query
     */
    search = (query) => {
        if (!query) {
            this.setState({ searchResults: [] });
            return;
        }

        BooksAPI.search(query)
            .then(searchResults => 
                this.setState({ searchResults: searchResults }));
    }

    render() {
        const { onChangeShelf, onGetBookShelf } = this.props;
        
        return (
            <div className="search-books">
                <SearchBar onSearch={this.search} />
                <div className="search-books-results">
                    {
                        this.state.searchResults.length > 0
                            ? <BookList books={this.state.searchResults} onChangeShelf={onChangeShelf} onGetBookShelf={onGetBookShelf} />
                            : <p className="no-results-text">No results.</p>
                    }
                </div>
            </div>
        );
    }
}

SearchPage.propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    onGetBookShelf: PropTypes.func.isRequired
};

export default SearchPage;