import React, { Component } from 'react';
import classes from './KinoProfile.module.css';
import { NavLink } from "react-router-dom";

class KinoProfile extends Component {
    state = {
        loadedKinoProfile: null
    }



    render() {
        let cinema = <p style={{ textAlign: 'center' }}>Please select a Cinema!</p>;
        if (this.state.loadedKinoProfile) {
            cinema = (
                <div className="FullPost">
                    <h1>{this.state.loadedKinoProfile.title}</h1>
                    <p>{this.state.loadedKinoProfile.body}</p>
                </div>

            );
        }
        return (
            <div className={classes.KinoProfile}>
                {cinema}

            </div>
        )
    }
}

export default KinoProfile;