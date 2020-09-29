import React from 'react';
import logo from "../../../img/logo.png";
import classes from "./Title.module.css";
import { Icon  } from "@iconify/react";
import scGithub from "@iconify/icons-ei/sc-github";

function Title() {
    return (

        <header className={classes.Header}>
            <img className={classes.Logo} src={logo} alt="Logo" />
            <h1 className={classes.Title}>OpenAir Kino </h1>
            <a className={classes.GitHubLink}
                href="https://github.com/moinkatja/open-air-kino"
                title="GitHub Project">
                <Icon icon={scGithub} color="darkgrey" width="50" height="50" />
            </a>
        </header>

    )
}

export default Title
