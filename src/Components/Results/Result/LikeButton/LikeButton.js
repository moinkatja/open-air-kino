import React, { Component } from 'react'

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.addCinemaToFavorite = this.addCinemaToFavorite.bind(this);
        this.state = {
            fav:"",
        }
    }

     addCinemaToFavorite(fav, e) {
    
   
        this.setState({ fav: fav});
        this.props.AddFavorite(this.props.fav);
    } 
    render() {
        return (
            <button
                onClick={this.addCinemaToFavorite}
                disabled={this.props.disabled}
            > Like</button>
        )
    }
}

export default LikeButton;