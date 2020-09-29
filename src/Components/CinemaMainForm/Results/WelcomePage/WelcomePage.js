import React from 'react'
import classes from './WelcomePage.module.css';
import PopCorn from "../../../../img/popcorn.png";

function WelcomePage() {
    return (
        <div className="DetailsPage">
            <h1>Welcome to OpenAir Kino App</h1>
            <li>You can search and browse outdoor cinemas</li>
            <li>You can view cinema details like address etc.</li>
            <li>You can add to favorites the cinemas you like</li>
            <img src ={PopCorn} alt = "PopCorn" className={classes.WelcomePic}/>
        </div>

    )
}

export default WelcomePage
