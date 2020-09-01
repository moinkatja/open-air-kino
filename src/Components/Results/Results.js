import React, { Component } from 'react';
import Result from "./Result/Result";

import classes from "./Results.module.css";

class Results extends Component {

    constructor(props) {
        super(props);
        this.changeActiveCinema = this.changeActiveCinema.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
    }

    addFavorite(id) {
        this.props.favorites(id);
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
                    this.props.cinemas.map((cinema, id) =>
                        <Result
                            name={cinema.name}
                            tel={cinema.tel}
                            street={cinema.street}
                            city={cinema.city}
                            id={cinema.id}
                            key={id}
                            pic={cinema.pic}
                            clicked={this.changeActiveCinema}
                            favorites={() => this.addFavorite(cinema.id)}
                            activeCinema={this.props.activeCinema}                    
                            liked={(this.props.liked).includes(cinema.id) ? "Unlike": "Like"}
                        />
                    )
                }
            </div>
        )
    }
}

export default Results;
