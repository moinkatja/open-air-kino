import React, { Component } from 'react';


import classes from './CinemaProfile.module.css';


class CinemaProfile extends Component {
 
    render() {
  
        return (
            <div className={classes.CinemaProfile}>
               <h2>{this.props.name}</h2>
               <h3>{this.props.city}</h3> 
               <h3>{this.props.street}</h3> 
               <h3>Telefon: {this.props.tel}</h3> 
               <img className={classes.CinemaPicture} src={this.props.pic} alt="CinemaPicture" />
            </div>
        )
    }
}

export default CinemaProfile;