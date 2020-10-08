import React, { Component } from 'react';
import classes from './SearchForm.module.css';
import {  NavLink } from 'react-router-dom'

class SearchForm extends Component {

    render() {
        let regionItems = this.props.cinemas.map((item) =>
            item.region);
        let dropdownOption = [...new Set(regionItems)].map((region) =>
            <option as={NavLink} href="/open-air-kino" to="/open-air-kino"  value={region} key={region}>{region}</option>
        )
        
        return (
            <form method="post" className={classes.SearchForm}>
                <select className={classes.SelectField} onChange={this.props.getRegion} name="region">
                    <option as={NavLink} href="/open-air-kino" to="/open-air-kino"  value="">Show all the regions</option>
                    {dropdownOption}
                </select>

            </form>
        )
    }
}

export default SearchForm;
