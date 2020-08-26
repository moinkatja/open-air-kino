import React, { Component } from 'react';


import classes from './CinemaProfile.module.css';


class CinemaProfile extends Component {

    render() {

        return (
            <div className={classes.CinemaProfile}>
                <h2>{this.props.name}</h2>
                <p>{this.props.city}, {this.props.street}</p>
                <p>Telefon: {this.props.tel}</p>
                <img className={classes.CinemaPicture} src={this.props.pic} alt="CinemaPicture" /> 
            </div>
        )
    }
}

export default CinemaProfile;