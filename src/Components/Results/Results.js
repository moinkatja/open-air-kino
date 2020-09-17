import React, { Component } from 'react';
import Result from "./Result/Result";
import Pagination from "./Pagination/Pagination";
import { NavLink } from "react-router-dom";


import classes from "./Results.module.css";


class Results extends Component {
    constructor(props) {
        super(props);
        this.changeActiveCinema = this.changeActiveCinema.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
    }

    addFavorite(cinemaId) {
        this.props.favorites(cinemaId)
    }

    changeActiveCinema(e) {
        const buttonId = e.target.id;
        const cinemaId = buttonId[0];
        this.props.cinemaToSelect(cinemaId);
    }

    render() {
        const indexOfLastResult = this.props.currentPage * this.props.resultsPerPage;
        const indexOfFirstResult = indexOfLastResult - this.props.resultsPerPage;
        const currentResult = this.props.cinemas.slice(indexOfFirstResult, indexOfLastResult);

        return (

            <div className={classes.Results}>
                {
                    currentResult.map((cinema, id) =>
                            <NavLink key = {id}
                            to={`/${this.props.tab}/${cinema.id}`}>
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
                                    liked={(this.props.liked).includes(cinema.id) ? "Dislike" : "Like"}
                                />
                            </NavLink>
                    )
                }
                <Pagination cinemas={this.props.cinemas} clickedPage={this.props.clickedPage} currentPage={this.props.currentPage} resultsPerPage={this.props.resultsPerPage} />
            </div>


        )
    }
}

export default Results;
