import React, { Component } from 'react';
import Result from "./Result/Result";

import classes from "./Results.module.css";

class Results extends Component {

    constructor(props) {
        super(props);
        this.changeActiveCinema = this.changeActiveCinema.bind(this);
        this.addToFavorites = this.addToFavorites.bind(this);
        this.state = {
            favorites: [0],
            //disabled: false
        }
    }

    addToFavorites(fav) {
        this.setState({
            //disabled: true,
            favorites: [...this.state.favorites, fav]
        });
        this.props.onAddFavorite(this.state.favorites);
        console.log(this.state.favorites)
    }


    changeActiveCinema(e) {
        const buttonId = e.target.id;
        const cinemaId = buttonId[0];
        this.props.cinemaToSelect(cinemaId);
    }

    render() {

        return (
            <div className={classes.Results}>
                {
                    this.props.cinemas.map((cinema) =>
                        <Result
                            name={cinema.name}
                            tel={cinema.tel}
                            street={cinema.street}
                            city={cinema.city}
                            id={cinema.id}
                            key={cinema.id}
                            pic={cinema.pic}
                            clicked={this.changeActiveCinema}
                            activeCinema={this.props.activeCinema}
                            AddFavorite={this.addToFavorites}
                            fav={cinema}
                        />
                    )
                }
            </div>
        )
    }
}

export default Results;
