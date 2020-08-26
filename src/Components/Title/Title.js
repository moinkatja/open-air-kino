import React from 'react';
import logo from "../../img/logo.png";
import classes from "./Title.module.css";

function Title() {
    return (
        <header className={classes.Header}>
            <img className={classes.Logo} src={logo} alt="Logo" />
            <h1 className={classes.Title}>OpenAir Kino </h1>
        </header>
    )
}

export default Title
