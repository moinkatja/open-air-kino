import React from 'react';
import '../../CinemaProfile/CinemaProfile';

function Result(props) {
    return (
       
            <div
                className={props.id === props.activeCinema ? "ResultButtonActive" : "ResultButton"}
                id={props.id}
                onClick={props.clicked} >
                <img
                    className={props.id === props.activeCinema ? "KinoThumbnailActive" : "KinoThumbnail"}
                    src={props.pic} alt="Kino Thumbnail" />
                <h4><strong>{props.name}</strong></h4> 
                <p> {props.city}, {props.street} </p>

                <button className={props.liked === "Like" ? "LikeButtonActive" : "LikeButtonNotActive"} key={props.id}
                    onClick={props.favorites}
                >  {props.liked}</button>
            </div>
   
    )
}

export default Result
