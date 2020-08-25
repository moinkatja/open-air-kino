import React, { Component } from 'react';
import Result from "./Result/Result";

import classes from "./Results.module.css";

class Results extends Component {

    constructor(props) {
        super(props);
        this.changeActiveCinema = this.changeActiveCinema.bind(this);
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
                            city={cinema.city}
                            id={cinema.id}
                            key={cinema.id}
                            clicked={this.changeActiveCinema}
                            activeCinema={this.props.activeCinema}
                        />
                    )
                }
            </div>
        )
    }
}

export default Results;
