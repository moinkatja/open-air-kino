import React, { Component, Fragment } from 'react';
import Result from "./Result/Result";
import Pagination from "./Pagination/Pagination";
import CinemaProfile from "./CinemaProfile/CinemaProfile";
import WelcomePage from "./WelcomePage/WelcomePage";
import { NavLink } from "react-router-dom";
import { getFavs, getCinemaRegion, getCinemaDetails, calculateCurrentPage } from "../../../services";
import ControlButtons from "./ControlButtons/ControlButtons"

import classes from "./Results.module.css";

class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            favorites: [],
            displayedCinemas: [],
            selectedCinema: null,
            currentPage: null,
            resultsPerPage: 5,
        };
    }

    componentDidMount() {
        const getFavs = JSON.parse(sessionStorage.getItem("favorites")) || [];

        this.setState({
            favorites: getFavs,
            displayedCinemas: this.props.cinemas,
        });


        (this.props.tab === "cinemas") && (getCinemaDetails(this.props.cinemas, this.props.cinemaId)) ?
            this.setState({
                selectedCinema: this.props.cinemaId,
                currentPage: calculateCurrentPage(this.props.cinemaId, this.state.resultsPerPage)
            }) :
            this.setState({
                selectedCinema: null,
                currentPage: 1
            });
    }

    goHome = () => {
        this.setState({
            displayedCinemas: this.props.cinemas,
            selectedCinema: null,
            currentPage: 1,
        })
    }

    //Handler for dropdown with regions

    getRegion = (e) => {
        e.preventDefault();
        const region = e.target.value;

        if (region === "") {
            this.setState({
                displayedCinemas: this.props.cinemas,
                currentPage: 1,
                selectedCinema: this.props.cinemas[0].id,
            })
        }
        else {
            this.setState({
                displayedCinemas: getCinemaRegion(this.props.cinemas, region),
                currentPage: 1,
                selectedCinema: getCinemaRegion(this.props.cinemas, region)[0].id,
            });
        }
    }

    //Change active cinema by clickng on it

    changeActiveCinema = (e) => {
        const cinemaId = e.target.id;
        this.setState({
            selectedCinema: cinemaId
        });
    }


    handlePageClick = (e) => {
        e.preventDefault();
        const pageNum = Number(e.target.id);
        this.setState({
            currentPage: pageNum
        });
    }

    //Add cinemaId to favorites state and toggle betweeb "Like" and "Dislike"

    addFavorite = (id) => {
        if (!this.state.favorites.includes(id)) {
            this.setState({
                favorites: [...this.state.favorites, id],
            })
        }

        else {
            this.setState({
                favorites: this.state.favorites.filter(function (cinema) {
                    return cinema !== id
                }),
            })
        }
    }

    //Show favorites by clicking on the fav button

    showFavorites = () => {
        this.setState({
            currentPage: 1,
            selectedCinema: getFavs(this.props.cinemas, this.state.favorites)[0].id,
        });
    }

    //Save favorites to session session storage

    componentDidUpdate() {
        sessionStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    }

    render() {
        let activeCinema = this.state.selectedCinema;
        let currentPage = this.state.currentPage;
        let cinemasToDisplay; // Main results 
        let cinemaDetails; // Details 
        let favorites = this.state.favorites || [];
     
        switch (this.props.tab) {
            case "favorites": {
                cinemasToDisplay = getFavs(this.props.cinemas, this.state.favorites);
                this.state.favorites.includes(this.props.cinemaId) ?
                    activeCinema = this.props.cinemaId :
                    activeCinema = this.state.favorites[0];
                if (this.state.favorites.length <= this.state.resultsPerPage)
                    currentPage = 1;
                break;
            }
            default: {
                cinemasToDisplay = this.state.displayedCinemas;
                if (!this.state.selectedCinema)
                    activeCinema = this.props.cinemaId;
            }
        }

        cinemaDetails = getCinemaDetails(this.props.cinemas, activeCinema);

        let indexOfLastResult = currentPage * this.state.resultsPerPage;
        let indexOfFirstResult = indexOfLastResult - this.state.resultsPerPage;
        let currentResult = cinemasToDisplay.slice(indexOfFirstResult, indexOfLastResult);

        return (
            <Fragment>
                <section className={classes.Results}>
                    <ControlButtons
                        favorites={favorites}
                        cinemas={this.props.cinemas}
                        clickedHomeBtn={this.goHome}
                        clickedFavBtn={this.showFavorites.bind(this)}
                        getRegion={this.getRegion}
                        tab={this.props.tab}
                    />

                    {(currentResult.length > 0) ?
                        currentResult.map((cinema, id) =>
                            <NavLink key={id}
                                to={`/${this.props.tab}/${cinema.id}`} >
                                <Result
                                    selectedCinema={activeCinema}
                                    key={id}
                                    id={cinema.id}
                                    name={cinema.name}
                                    tel={cinema.tel}
                                    street={cinema.street}
                                    city={cinema.city}
                                    pic={cinema.pic}
                                    clickedResult={this.changeActiveCinema.bind(this)}
                                    clickedLike={() => this.addFavorite.bind(this)(cinema.id)}
                                    likeBtn={favorites.includes(cinema.id) ? "Dislike" : "Like"}
                                />

                            </NavLink>
                        ) : <h4 className={classes.NoFavMessage}>Sorry, you do not have any favorites yet</h4>
                    }

                    <Pagination
                        cinemas={cinemasToDisplay}
                        clickedPage={this.handlePageClick.bind(this)}
                        currentPage={this.state.currentPage}
                        resultsPerPage={this.state.resultsPerPage}
                    />
                </section>

                {
                    cinemaDetails ?
                        <CinemaProfile
                            cinemaDetails={cinemaDetails}
                        /> : <WelcomePage />
                }

            </Fragment>
        )
    }
}

export default Results;
