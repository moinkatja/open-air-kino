import React from 'react';
import '../CinemaProfile/CinemaProfile';
import classes from "./Result.module.css";

function Result(props) {

    return (
        <div
            className={props.id === props.selectedCinema ? [classes.ResultButton, classes.ResultButton_Active].join(" ") : [classes.ResultButton, classes.ResultButton_NotActive].join(" ")}
            id={props.id}
            onClick={props.clickedResult} >
                
            <img
                className={props.id === props.selectedCinema ? classes.KinoThumbnail : [classes.KinoThumbnail, classes.KinoThumbnail_NotActive].join(" ")}
                src={props.pic} alt="Kino Thumbnail" />
            <h4><strong>{props.name}</strong></h4>
            <p> {props.city}, {props.street} </p>
            
            <button className={props.likeBtn === "Like" ? classes.LikeButton : [classes.LikeButton, classes.LikeButton_NotActive].join(" ")} key={props.id}
                onClick={props.clickedLike}
            > {props.likeBtn}</button>

        </div>
    )
}

export default Result
