import React, { Component } from 'react';
import classes from './Form.module.css';

class Form extends Component {
    render() {
        return (
            <form method="post">
            <select onChange={this.props.getCity} type="submit" name="city">
                <option  value="">Show all the cities</option>
                <option  value="Berlin">Berlin</option>
                <option  value="Hamburg" >Hamburg</option>
            </select>
        </form>
        )
    }
}

export default Form;