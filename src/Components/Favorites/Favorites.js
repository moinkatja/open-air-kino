import React from 'react';
import classes from './Favorites.module.css';

function Favorites(props) {
    console.log(props.favorites.length)
   const text = (props.favorites.length) ? props.favorites.length : '0'
    
    return (
    
        <div className={classes.Favorites}>
             Fav ( {text} )
       
    </div>
    )
}

export default Favorites
