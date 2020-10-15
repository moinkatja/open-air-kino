import React, { Component } from 'react';
import classes from './Favorites.module.css';
import liked from "../../../../../img/liked.png";
import notliked from "../../../../../img/notliked.png";
import { NavLink } from 'react-router-dom';

class Favorites extends Component {

    render() {
        const text = (this.props.favorites.length) ? this.props.favorites.length : '0';
        return (
            <div className={classes.Favorites} >
                {
                    this.props.favorites.length > 0 ? (
                        <NavLink to={{ pathname: `/favorites` }}>
                            <img src={liked} alt="Favorites" className={[classes.LikeImg, classes.FavoritesButton].join(" ")} onClick={this.props.clickedFavBtn} /> <strong> {text} </strong>
                        </NavLink>
                    ) : (<button className={classes.FavoritesButton} disabled>
                        <img src={notliked} alt="Favorites empty" className={classes.LikeImg} /> <strong> {text} </strong>
                    </button>)
                }
            </div>
        )
    }
}

export default Favorites