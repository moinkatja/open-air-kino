import React from 'react';
import  './Form.module.css';

const Form = props => {
    return (


        <form onSubmit={props.getCinemas}>
            <select>
                <option>Berlin</option>
                <option >Hamburg</option>
            </select>
            <button>Submit</button>
        </form>

    )
}

export default Form;
