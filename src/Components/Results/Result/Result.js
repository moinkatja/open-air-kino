import React from 'react';
import classes from "./Result.module.css";


function Result(props) {
    return (
        <div className={classes.ResultItem}>
            <img className={classes.KinoThumbnail} src={props.pic} alt="Kino Thumbnail" />
            <div>
                <h2>{props.name}</h2>
               <h3> {props.city}</h3>
               <h3> Tel: {props.tel}</h3>

            </div>




        </div>
    )
}

export default Result
