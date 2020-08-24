import React from 'react';
import classes from './Form.module.css';

const Form = props => {
    return (


        <form onSubmit="">
            <select>
                <option>Berlin</option>
                <option >Hamburg</option>
            </select>
            <button className={classes.SubmitBtn}>Submit</button>
        </form>

    )
}

export default Form;
