import React from 'react'
import classes from "./HomeBtn.module.css"
import home from "../../../../../img/home.png";
import { NavLink } from 'react-router-dom';

function HomeBtn(props) {
    return (
        <NavLink to="/">
            <img className={classes.HomeBtn} onClick={props.clickedHomeBtn} src={home} alt="Home button" />
        </NavLink>
    )
}

export default HomeBtn


