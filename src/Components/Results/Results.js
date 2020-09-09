import React, { Component } from 'react';
import Result from "./Result/Result";
import Pagination from "./Pagination/Pagination";

import classes from "./Results.module.css";


class Results extends Component {
    constructor(props) {
        super(props);
        this.changeActiveCinema = this.changeActiveCinema.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
    }

    addFavorite(cinemaId) {
       // localStorage.setItem("favorites", this.props.favorites);
        this.props.favorites(cinemaId);
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
                    {this.props.error}
                    {
                        currentResult.map((cinema, id) =>
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
                        )
                    }
                    <Pagination cinemas={this.props.cinemas} clickedPage={this.props.clickedPage} resultsPerPage={this.props.resultsPerPage} />
                </div>
          

        )
    }
}

export default Results;
