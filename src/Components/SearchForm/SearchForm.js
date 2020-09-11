import React, { Component } from 'react';
import classes from './SearchForm.module.css';

class SearchForm extends Component {


    render() {
        let regionItems = this.props.cinemasInitial.map((item) =>
            item.region);

        let dropdownOption = [...new Set(regionItems)].map((region) =>
            <option value={region} key={region}>{region}</option>);

        return (
            <form method="post" className={classes.SearchForm}>
                <select onChange={this.props.getRegion} name="region">
                     <option value="">Show all the regions</option> 
                    {dropdownOption}
                </select>
            </form>
        )
    }
}

export default SearchForm;