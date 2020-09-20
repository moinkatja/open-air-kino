import React from 'react'
import classes from "./HomeBtn.module.css"
import home from "../../../img/home.png";
import { Link } from 'react-router-dom';


function HomeBtn(props) {

    return (
        <Link to="/">
             <button className={classes.HomeBtn} onClick={props.clickedHomeBtn}> 
           <img className={classes.HomeImg} src={home} alt="Home button" />
            </button> 
        </Link>
    )
}
export default HomeBtn


