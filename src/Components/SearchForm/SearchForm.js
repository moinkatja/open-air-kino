import React, { Component } from 'react';
import classes from './SearchForm.module.css';

class SearchForm extends Component {


    render() {
        let cityItems = this.props.cinemasInitial.map((item) =>
            item.city);

        let dropdownOption = [...new Set(cityItems)].map((city) =>
            <option value={city} key={city}>{city}</option>);

        return (
            <form method="post" className={classes.SearchForm}>
                <select onChange={this.props.getCity} name="city">
                     <option value="">Show all the cities</option> 
                    {dropdownOption}
                </select>
            </form>
        )
    }
}

export default SearchForm;