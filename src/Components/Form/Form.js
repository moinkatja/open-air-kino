import React from 'react';
import Results from "../Results/Results";
import KinoProfile from "../KinoProfile/KinoProfile";

import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import classes from './Form.module.css';
import logo from "./camera.png";

function Form() {
    return (
        <div className={classes.MainForm}>

            <h1><img className={classes.Logo} src={logo} alt="Logo" />OpenAir Kino </h1>
            <select >
                <option>Berlin</option>
                <option selected>Hamburg</option>
            </select>
            <Results />
            <KinoProfile />


        </div>


    )
}

export default Form;
