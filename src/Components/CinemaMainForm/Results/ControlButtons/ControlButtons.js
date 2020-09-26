import React from 'react';
import SearchForm from "./SearchForm/SearchForm";
import HomeBtn from "./HomeBtn/HomeBtn";
import Favorites from "./Favorites/Favorites";
import classes from "./ControlButtons.module.css";

function ControlButtons(props) {
    return (
        <div className={classes.ControlButtons}>
            {(props.tab === "favorites") ?
                <h1 className={classes.FavsTitle}>favorites</h1> :
                <SearchForm
                    getRegion={props.getRegion}
                    cinemas={props.cinemas}
                />
            }

            <HomeBtn
                clickedHomeBtn={props.clickedHomeBtn}
            />

            <Favorites
                favorites={props.favorites}
                cinemas={props.cinemas}
                clickedFavBtn={props.clickedFavBtn}
            />
        </div>
    )
}

export default ControlButtons
