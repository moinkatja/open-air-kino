import React from 'react';
import '../../CinemaProfile/CinemaProfile';
import { BrowserRouter, NavLink } from "react-router-dom";

function Result(props) {

    return (
        <BrowserRouter>
            <NavLink to={
                { pathname: `${props.id}` }}>
                <div
                    className={props.id === props.activeCinema ? ' activeResultButton' : 'ResultButton'}
                    id={props.id}
                    onClick={props.clicked} >
                    {/* <img
                        className={props.id === props.activeCinema ? ' activeKinoThumbnail' : 'KinoThumbnail'}
                        src={props.pic} alt="Kino Thumbnail" /> */}
                    <h4><strong>{props.name}</strong></h4> <p> {props.city}, Tel: {props.tel} </p>
                </div>
            </NavLink>
        </BrowserRouter>
    )
}

export default Result
