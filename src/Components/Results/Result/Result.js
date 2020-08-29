import React, { Component } from 'react';
import '../../CinemaProfile/CinemaProfile';
import { BrowserRouter, NavLink } from "react-router-dom";
import classes from './Result.module.css';

class Result extends Component {
    constructor(props) {
        super(props);
        this.addCinemaToFavorite = this.addCinemaToFavorite.bind(this);
        this.state = {
            fav: "",
        }
    }
    
    addCinemaToFavorite(fav) {
        this.setState({ fav: fav });
        this.props.AddFavorite(this.props.fav);
    }

    render() {
        return (
            <BrowserRouter>
                <NavLink to={
                    { pathname: `${this.props.id}` }}>
                    <div
                        className={this.props.id === this.props.activeCinema ? "ActiveResultButton" : "ResultButton"}
                        id={this.props.id}
                        onClick={this.props.clicked} >
                        <img
                            className={this.props.id === this.props.activeCinema ? "ActiveKinoThumbnail" : "KinoThumbnail"}
                            src={this.props.pic} alt="Kino Thumbnail" />
                        <h4><strong>{this.props.name}</strong></h4> <p> {this.props.city}, {this.props.street} </p>

                        <button className={classes.LikeButton}
                            onClick={this.addCinemaToFavorite}
                            disabled={this.props.disabled}
                        > Like</button>


                    </div>
                </NavLink>
            </BrowserRouter>
        )
    }
}

export default Result;