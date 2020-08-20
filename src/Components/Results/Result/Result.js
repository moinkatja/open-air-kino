import React from 'react';
import classes from "./Result.module.css";
import '../../CinemaProfile/CinemaProfile';
import { BrowserRouter, NavLink } from "react-router-dom";

function Result(props) {
    
    return (
        <BrowserRouter>
            <NavLink to={
                { pathname: `${props.id}` }}>
                <div
                    className={props.id === props.activeCinema ? ' activeResult' : 'ResultButton'}
                    id={props.id}
                    onClick={props.clicked} >
                    <img
                        className={classes.KinoThumbnail}
                        src={props.pic} alt="Kino Thumbnail" />
                    <p><strong>{props.name}</strong></p> <p> {props.city}, Tel: {props.tel} </p>
                </div>
            </NavLink>
        </BrowserRouter>
    )
}

export default Result
