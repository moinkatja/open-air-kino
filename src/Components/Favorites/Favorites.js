import React, { Component } from 'react';
import classes from './Favorites.module.css';
import liked from "../../img/liked.png";
import notliked from "../../img/notliked.png";




class Favorites extends Component {
    constructor() {
        super();
        this.showActiveCinema = this.showActiveCinema.bind(this);
    }

    showActiveCinema() {
        //this.props.cinemas(cinemaId);
        this.props.cinemas();
        this.props.selectedCinema(this.props.favorites[0]);
    }

    render() {
        // console.log(this.props.favorites);
        const text = (this.props.favorites.length) ? this.props.favorites.length : '0';

        return (
            <div className={classes.Favorites} >
                {
                    this.props.favorites.length > 0 ?
                        (<button onClick={this.showActiveCinema} className={classes.FavoritesButton}>
                            <img src={liked} alt="Favorites"/> <strong> {text} </strong>
                        </button>
                        ) : (<button className={classes.FavoritesButton} disabled>
                             <img src={notliked} alt="Favorites empty"/> <strong> {text} </strong>
                        </button>)
                }
            </div >
        )
    }
}

export default Favorites