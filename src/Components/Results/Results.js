import React, { Component } from 'react';
import Result from "./Result/Result";
import Pagination from "./Pagination/Pagination";
import CinemaProfile from "../CinemaProfile/CinemaProfile";
import WelcomePage from "../WelcomePage/WelcomePage";
import { NavLink } from "react-router-dom";
import { getFavs, getCinemaRegion, getCinemaDetails, calculateCurrentPage, getResultsPerPage } from "../../services";
import ControlButtons from "../ControlButtons/ControlButtons"

import classes from "./Results.module.css";

class Results extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);

        this.state = {
            favorites: [],
            displayedCinemas: [],
            selectedCinema: null,
            currentPage: 1,
            resultsPerPage: null,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        const getFavs = JSON.parse(localStorage.getItem("favorites")) || "[]";

        this.setState({
            favorites: getFavs,
            displayedCinemas: this.props.cinemas,
            currentPage: 1,
        });

        this.props.cinemaId ? this.setState({ selectedCinema: this.props.cinemaId }) : this.setState({ selectedCinema: null });

        this.getPagination();
        window.addEventListener("resize", this.getPagination.bind(this));
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
                loading: false,
                displayedCinemas: this.props.cinemas,
                currentPage: 1,
            })
        }
        else {
            this.setState({
                loading: false,
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

    //Pagination depending on the screen size

    getPagination = () => {
        this.setState({
            resultsPerPage: getResultsPerPage()
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
                favorites: [...this.state.favorites, id]
            })
        }
        else {
            this.setState({
                favorites: this.state.favorites.filter(function (cinema) {
                    return cinema !== id
                })
            })
        }
    }

    //Show favorites by clicking on the fav button

    showFavorites = () => {
        this.setState({
            currentPage: 1,
        });
    }

    //Save favorites to LocalStorage

    componentDidUpdate() {
        localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.getPagination.bind(this));
        this._isMounted = false;
    }

    render() {
        let cinemasToDisplay;
        let cinemaDetails;

        this.props.cinemaId ?
            cinemaDetails = getCinemaDetails(this.props.cinemas, this.props.cinemaId) :
            cinemaDetails = getCinemaDetails(this.props.cinemas, this.state.selectedCinema);

        switch (this.props.tab) {
            case "favorites": {
                cinemasToDisplay = getFavs(this.props.cinemas, this.state.favorites)
                if (this.state.favorites.includes(this.props.cinemaId) === false){ cinemaDetails = null }
                break;
            }
            default: cinemasToDisplay = this.state.displayedCinemas;
        }

       /*  let currentPage;
        this.props.cinemaId ? currentPage = calculateCurrentPage(this.props.cinemaId, this.state.resultsPerPage) :
        currentPage = this.state.currentPage; */

        let indexOfLastResult = this.state.currentPage * this.state.resultsPerPage;
        let indexOfFirstResult = indexOfLastResult - this.state.resultsPerPage;
        let currentResult = cinemasToDisplay.slice(indexOfFirstResult, indexOfLastResult);

        // : (this.props.cinemaId ? getFavs(this.state.cinemasInitial, this.props.cinemaId):  this.state.cinemas)
        return (
            <section className={classes.CinemaApp}>
                <div className={classes.Results}>
                    <ControlButtons
                        favorites={this.state.favorites}
                        cinemas={this.props.cinemas}
                        selectedCinema={cinemaDetails}
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
                                    name={cinema.name}
                                    tel={cinema.tel}
                                    street={cinema.street}
                                    city={cinema.city}
                                    id={cinema.id}
                                    key={id}
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
