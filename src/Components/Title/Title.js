import React from 'react';
import logo from "../../img/logo.png";
import classes from "./Title.module.css";


function Title() {
    return (

        <header className={classes.Header}>
            {/* <Link to="/"> */}
                <img className={classes.Logo} src={logo} alt="Logo" />
                <h1 className={classes.Title}>OpenAir Kino </h1>
            {/* </Link> */}
        </header>

    )
}

export default Title
