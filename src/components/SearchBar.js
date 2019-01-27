import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

/**
 * Displays the search bar on the search page.
 * Holds the search input and the back button.
 * @author [Paulo Ribeiro](https://github.com/paulo-ribeiro)
 */
class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ""
        };

        this.handleSearch = _.debounce(this.handleSearch, 500);
    }

    /**
     * Handles changes in the SearchBar text input.
     * Captures inserted text and calls onSearch through props.
     * @param {Object} e - input event
     */
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        this.handleSearch();
    }

    handleSearch = () => this.props.onSearch(this.state.query);

    render() {
        return (
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        name="query"
                        placeholder="Search by title or author"
                        onChange={this.handleChange}
                        value={this.state.query} />
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired
};

export default SearchBar;