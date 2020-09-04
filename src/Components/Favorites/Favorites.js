import React, { Component } from 'react';
import classes from './Favorites.module.css';

class Favorites extends Component {
    constructor() {
        super();

        this.state = {
            showMenu: false,
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.showActiveCinema = this.showActiveCinema.bind(this);
    }

    showMenu(event) {
        event.preventDefault();

        this.setState({
            showMenu: !this.state.showMenu,
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    showActiveCinema(cinemaId) {
        //this.props.cinemas(cinemaId);
        this.props.cinemas(cinemaId);
        this.props.selectedCinema(cinemaId);
    }

    render() {
       // console.log(this.props.favorites);
        const text = (this.props.favorites.length) ? this.props.favorites.length : '0';
        const item = this.props.favorites;

        return (

            <div className={classes.Favorites} >
                <button onClick={this.showMenu}>
                    Saved: <strong> {text} </strong>
                </button>
                {
                    this.state.showMenu
                        ? (
                            item.length > 0 ?
                                (
                                    <div className={classes.FavMenu}>
                                        {
                                            this.props.favorites.map((favorite, id) =>
                                                <button key={id} onClick={() => this.showActiveCinema(favorite)}> Result {favorite} </button>
                                            )
                                        }
                                    </div>)
                                : <div className={classes.FavMenu}> no favorites yet </div>)
                        : (
                            null
                        )
                }

            </div >
        )
    }
}

export default Favorites