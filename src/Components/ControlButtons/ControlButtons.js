import React from 'react'
import HomeBtn from "./HomeBtn/HomeBtn";
import Favorites from "./Favorites/Favorites";
import classes from "./ControlButtons.module.css";

function ControlButtons(props) {
    return (
        <div className={classes.ControlButtons}>
                <HomeBtn
                    clickedHomeBtn={props.clickedHomeBtn}
                    cinemas={props.cinemas}
                    cinemasIntiial={props.cinemasIntiial}
                />
             
                <Favorites
                    favorites={props.favorites}
                    selectedCinema={props.selectedCinema}
                    cinemas={props.cinemas}
                />
        </div>
    )
}

export default ControlButtons
