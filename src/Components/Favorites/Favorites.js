import React from 'react';
import classes from './Favorites.module.css';

function Favorites(props) {
    return (
        <div className={classes.Favorites}>
        Fav ({props.favorites.length})
    </div>
    )
}

export default Favorites
