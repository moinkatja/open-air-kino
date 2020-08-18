import React, { Component } from 'react';
import Result from "./Result/Result";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";

import classes from "./Results.module.css";

class Results extends Component {
    constructor(props) {
        super(props);
        this.changeCinema = this.changeCinema.bind(this);
    }

    changeCinema(e) {

        const buttonId = e.target.id;
        const cinemaId = buttonId[0];
        this.props.cinemaToSelect(cinemaId);

    }

    render() {
        return (
            <div className={classes.Results}>
                {
                    this.props.cinemas.map((cinema) =>
                        <BrowserRouter>
                            <Link to={{
                                pathname: `${cinema.id}`
                            }}>
                                <Result
                                    name={cinema.name}
                                    tel={cinema.tel}
                                    pic={cinema.pic}
                                    city={cinema.city}
                                    id={cinema.id}
                                    key={cinema.id}
                                    clicked={this.changeCinema}
                                />
                            </Link>
                        </BrowserRouter>
                    )
                }
            </div>
        )


    }
}

export default Results;





