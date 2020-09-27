import React, { Component } from 'react';
import classes from './CinemaProfile.module.css';

class CinemaProfile extends Component {

    render() {
        return (
            <div className={classes.CinemaProfile}>
                <h2>{this.props.cinemaDetails.name}</h2>
                <p><strong>{this.props.cinemaDetails.region}</strong></p>
                <p> {this.props.cinemaDetails.postcode} {this.props.cinemaDetails.city}, {this.props.cinemaDetails.street}</p>
                {this.props.cinemaDetails.tel ?
                    <p>Tel: {this.props.cinemaDetails.tel}</p> : ""
                }
                <img className={classes.CinemaPicture} src={this.props.cinemaDetails.pic} alt="CinemaPicture" />
            </div>
        )
    }
}

export default CinemaProfile;
