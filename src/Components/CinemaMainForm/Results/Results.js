import React, { Component } from 'react';
import Result from "./Result/Result";
import Pagination from "./Pagination/Pagination";
import CinemaProfile from "./CinemaProfile/CinemaProfile";
import WelcomePage from "./WelcomePage/WelcomePage";
import { NavLink } from "react-router-dom";
import { getFavs, getCinemaRegion, getCinemaDetails, getResultsPerPage, calculateCurrentPage } from "../../../services";
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
        const getFavs = JSON.parse(localStorage.getItem("favorites")) || "[]";

        this.setState({
            favorites: getFavs,
            displayedCinemas: this.props.cinemas,
        });


        this.getPagination();
        window.addEventListener("resize", this.getPagination.bind(this));

        (this.props.tab === "cinemas" || this.props.tab === "favorites") && (getCinemaDetails(this.props.cinemas, this.props.cinemaId)) ?
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

    //Pagination depending on the screen size

    getPagination = () => {
        this.setState({
            resultsPerPage: getResultsPerPage()
        });
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

    //Save favorites to LocalStorage

    componentDidUpdate() {
        localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.getPagination.bind(this));
    }

    render() {

        let cinemasToDisplay;
        let cinemaDetails;


        switch (this.props.tab) {
            case "favorites": {
                cinemasToDisplay = getFavs(this.props.cinemas, this.state.favorites)
                this.state.favorites.includes(this.props.cinemaId) ?
                    cinemaDetails = getCinemaDetails(this.props.cinemas, this.props.cinemaId) :
                    cinemaDetails = null;
                break;
            }
            default: {
                cinemasToDisplay = this.state.displayedCinemas;
                this.props.cinemaId ?
                    cinemaDetails = getCinemaDetails(this.props.cinemas, this.props.cinemaId) :
                    cinemaDetails = getCinemaDetails(this.props.cinemas, this.state.selectedCinema);
            }
        }

        let indexOfLastResult = this.state.currentPage * this.state.resultsPerPage;
        let indexOfFirstResult = indexOfLastResult - this.state.resultsPerPage;
        let currentResult = cinemasToDisplay.slice(indexOfFirstResult, indexOfLastResult);

        console.log(cinemaDetails)
        console.log(this.state.selectedCinema)

        return (
            <section className={classes.CinemaApp}>
                <div className={classes.Results}>
                    <ControlButtons
                        favorites={this.state.favorites}
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
                                    selectedCinema={this.state.selectedCinema}
                                    key={id}
                                    id={cinema.id}
                                    name={cinema.name}
                                    tel={cinema.tel}
                                    street={cinema.street}
                                    city={cinema.city}
                                    pic={cinema.pic}
                                    clickedResult={this.changeActiveCinema.bind(this)}
                                    clickedLike={() => this.addFavorite.bind(this)(cinema.id)}
                                    likeBtn={(this.state.favorites).includes(cinema.id) ? "Dislike" : "Like"}
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
                </div>
                <div>
                    {
                        cinemaDetails ?
                            <CinemaProfile
                                cinemaDetails={cinemaDetails}
                            /> : <WelcomePage />
                    }
                </div >
            </section>
        )
    }
}

export default Results;
