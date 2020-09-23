import React, { Component } from 'react';
import classes from './SearchForm.module.css';
//import { NavLink } from 'react-router-dom';

class SearchForm extends Component {

    render() {
        let regionItems = this.props.cinemas.map((item) =>
            item.region);

        let dropdownOption = [...new Set(regionItems)].map((region, id) =>
            //<NavLink to={{ pathname: `/region` }} key={id}>
                <option value={region} key={region}>{region}</option>
           // </NavLink>
           )

        return (

            <form method="post" className={classes.SearchForm}>

                <select className={classes.SelectField} onChange={this.props.getRegion} name="region">
                    <option value="">Show all the regions</option>
                    {dropdownOption}
                </select>

            </form>
        )
    }
}

export default SearchForm;