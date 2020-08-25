import React, { Component } from 'react';
import './SearchForm.module.css';

class SearchForm extends Component {
    render() {
        return (
            <form method="post">
            <select onChange={this.props.getCity} type="submit" name="city">
                <option value="">Show all the cities</option>
                <option value="Berlin">Berlin</option>
                <option value="Hamburg" >Hamburg</option>
            </select>
        </form>
        )
    }
}

export default SearchForm;