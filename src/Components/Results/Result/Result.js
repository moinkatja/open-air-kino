import React from 'react';
import classes from "./Result.module.css";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

function Result(props) {

    return (
   
            <button className={classes.ResultItem} id={props.id} onClick={props.clicked} >
                <img className={classes.KinoThumbnail} src={props.pic} alt="Kino Thumbnail" />
                <div  >
                    <h2>{props.name}</h2>
                    <h3> {props.city}</h3>
                    <h3> Tel: {props.tel}</h3>
                </div>
            </button>
      
    )
}

export default Result
