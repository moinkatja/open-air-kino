import React, { Component } from 'react';
import Result from "./Result/Result";
import Pagination from "./Pagination/Pagination";
import { NavLink } from "react-router-dom";
import { getFavs, getCinemaRegion } from "../../services";
import { getResultsPerPage } from "../../getResultsPerPage";
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
            filter: "",
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
            currentPage: 1
        });

        this.props.cinemaId ? this.setState({ selectedCinema: this.props.cinemaId }) : this.setState({ selectedCinema: null });

        this.getResults();
        window.addEventListener("resize", this.getResults.bind(this));
    }

    routeChange = () => {
        this.setState({
            displayedCinemas: this.props.cinemas,
            selectedCinema: null,
            currentPage: 1
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

    changeActiveCinema(e) {
        const cinemaId = e.target.id;
        this.setState({
            selectedCinema: cinemaId
        });
    }

    //Pagination depending on the screen size

    getResults = () => {
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

    addFavorite(id) {
        if (!this.state.favorites.includes(id)) {
            this.setState({ favorites: [...this.state.favorites, id] })
        }

        else {
            this.setState({
                favorites: this.state.favorites.filter(function (cinema) {
                    return cinema !== id
                })
            })
            console.log(this.state.favorites)
        }
    }

    //Show favorites by clicking on the fav button

    showFavorites = () => {

        console.log(this.state.favorites[0])
        this.setState({
            selectedCinema: null,
            currentPage: 1,
        });
    }

    //Save favorites to LocalStorage

    componentDidUpdate() {
        localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.getResults.bind(this));
        this._isMounted = false;
    }

    render() {
        let cinemasToDisplay = this.state.displayedCinemas;

        if (this.props.tab === "favorites") { cinemasToDisplay = getFavs(this.props.cinemas, this.state.favorites) }

        //let currentPage = calculateCurrentPage(this.props.cinemaId, this.state.resultsPerPage)

        const indexOfLastResult = this.state.currentPage * this.state.resultsPerPage;
        const indexOfFirstResult = indexOfLastResult - this.state.resultsPerPage;
        const currentResult = cinemasToDisplay.slice(indexOfFirstResult, indexOfLastResult);

        console.log(cinemasToDisplay, currentResult)
        // : (this.props.cinemaId ? getFavs(this.state.cinemasInitial, this.props.cinemaId):  this.state.cinemas)
        return (

            <div className={classes.Results}>
                <ControlButtons
                    favorites={this.state.favorites}
                    cinemas={this.props.cinemas}
                    selectedCinema={this.state.selectedCinema}
                    clickedHomeBtn={this.routeChange}
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
                                liked={() => this.addFavorite.bind(this)(cinema.id)}
                                likedBtn={(this.state.favorites).includes(cinema.id) ? "Dislike" : "Like"}
                            />

                        </NavLink>
                    ) : <h4 className={classes.NoFavMessage}>Sorry, you do not have any favorites yet</h4>
                }

                <Pagination
                    cinemas={cinemasToDisplay}
                    clickedPage={this.handlePageClick.bind(this)} currentPage={this.state.currentPage} resultsPerPage={this.state.resultsPerPage} />
            </div>
        )
    }
}

export default Results;
