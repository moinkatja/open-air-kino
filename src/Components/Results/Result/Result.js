import React from 'react';
import '../../CinemaProfile/CinemaProfile';

function Result(props) {
    
    return (
            <div
                className={props.id === props.selectedCinema? "ResultButtonActive" : "ResultButton"}
                id={props.id}
                onClick={props.clickedResult} >
                <img
                    className={props.id === props.selectedCinema ? "KinoThumbnailActive" : "KinoThumbnail"}
                    src={props.pic} alt="Kino Thumbnail" />
                <h4><strong>{props.name}</strong></h4> 
                <p> {props.city}, {props.street} </p>
                <button className={props.likeBtn === "Like" ? "LikeButtonActive" : "LikeButtonNotActive"} key={props.id}
                    onClick={props.clickedLike}
                > {props.likeBtn}</button>
            </div>
    )
}

export default Result
