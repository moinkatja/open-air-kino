import React, { Component } from 'react';
import "./App.css";
import CinemaContainer from "../src/Components/CinemaContainer/CinemaContainer";
import Modal from "./Components/Modal/Modal"
import Title from "../src/Components/Title/Title";
import SearchForm from "./Components/SearchForm/SearchForm";
import Results from "../src/Components/Results/Results";
import CinemaProfile from "./Components/CinemaProfile/CinemaProfile";
import Spinner from "./Components/Spinner/Spinner";
import WelcomePage from './Components/WelcomePage/WelcomePage';
import HomeBtn from "./Components/HomeBtn/HomeBtn"
import Favorites from './Components/Favorites/Favorites';
import Footer from "./Components/Footer/Footer";
import { getCinemas } from "./getCinemas";
import { getResultsPerPage } from "./getResultsPerPage";
import { getFavs } from "./services";



import SAMPLE_ARRAY from "./sampledata";


//import Router from "./Components/Router/Router";

class App extends Component {
  constructor(props) {
    super(props);

    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);

    this.state = {
      cinemas: [],
      cinemasInitial: [],
      favorites: [],
      selectedCinema: null,
      liked: false,
      loading: false,
      error: false,
      filter: "",
      currentPage: 1,
      resultsPerPage: 5,
      tab: "cinemas"
    };
  }

  componentDidMount() {
    const getFavs = JSON.parse(localStorage.getItem("favorites")) || "[]";
    const getLikes = JSON.parse(localStorage.getItem("likes")) || "false";

    this.setState({
      loading: true,
      favorites: []
    });

    getCinemas("")

      .then(data => {
        if (data)
          this.setState({
            cinemas: data,
            cinemasInitial: data,
            loading: false,
            favorites: getFavs,
            liked: getLikes,
          });
      })
      .catch(err => {
        this.setState({
          cinemas: SAMPLE_ARRAY,
          cinemasInitial: SAMPLE_ARRAY,
          favorites: [],
          liked: false,
          error: err.message,
          loading: false,
        });
      })

    this.getResults();
    window.addEventListener("resize", this.getResults.bind(this));
  }

  getResults = () => {
    this.setState({
      resultsPerPage: getResultsPerPage()
    });
  }

  selectCinema = (cinemaId) => {
    if (cinemaId) {
      this.setState({
        selectedCinema: cinemaId
      });
    }
  }

  clearError = () => {
    this.setState({
      error: null
    })
  }

  showFavorites = () => {
    const favoritesArray = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      favoritesArray.push(this.state.cinemasInitial.find((cinema) => cinema.id === this.state.favorites[i]));
    }

    this.setState({
      cinemas: favoritesArray,
      currentPage: 1,
      tab: "favorites"
    });

  }

  toggleFavorite = (id) => {
    if (this.state.favorites.includes(id) === false) {
      this.setState({ favorites: [...this.state.favorites, id] })

    }
    else {
      this.setState({
        favorites: this.state.favorites.filter(function (cinema) {
          return cinema !== id
        })
      })
    }
  }

  handlePageClick = (e) => {
    e.preventDefault();
    const pageNum = Number(e.target.id);
    this.setState({
      currentPage: pageNum
    });
  }

  getRegion = (e) => {
    e.preventDefault();
    const region = e.target.value;
    this.setState({
      loading: true,
      currentPage: 1,
    });

    if (region === "") {
      this.setState({
        loading: false,
        cinemas: this.state.cinemasInitial,
        tab: "cinemas"
      })
    }
    else {
      const filteredData = this.state.cinemasInitial.filter((cinema) => cinema.region === region);
      this.setState({
        loading: false,
        cinemas: filteredData,
        tab: "cinemas",
        selectedCinema: filteredData[0].id,
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    localStorage.setItem("likes", JSON.stringify(this.state.liked));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.getResults.bind(this));
  }

  render() {


    let cinemaToSelect;
    if (this.state.selectedCinema) {
      cinemaToSelect = this.state.cinemas.find((cinema) => cinema.id === this.state.selectedCinema);
    }

    const cinemasToDisplay = (this.state.tab === 'favorites') ? getFavs(this.state.cinemas, this.state.favorites) : this.state.cinemas;
    
    return (

      <CinemaContainer>
        <Modal
          show={this.state.error ? true : false}
          errorMessage={this.state.error}
          modalClosed={this.clearError}
        />
        <Title />
        <SearchForm getRegion={this.getRegion} cinemasInitial={this.state.cinemasInitial} />
        {
          this.state.tab === 'favorites' ?
            (<HomeBtn clicked={this.props.clicked} />) :
            (<Favorites
              tab={this.state.tab}
              favorites={this.state.favorites}
              selectedCinema={this.selectCinema}
              cinemas={this.showFavorites}
            />)
        }
        {this.state.loading ? <Spinner /> :
          <Results
            tab={this.state.tab}
            error={this.state.error}
            cinemas={cinemasToDisplay}
            activeCinema={this.state.selectedCinema}
            cinemaToSelect={this.selectCinema}
            favorites={this.toggleFavorite}
            liked={this.state.favorites}
            resultsPerPage={this.state.resultsPerPage}
            clickedPage={this.handlePageClick}
            currentPage={this.state.currentPage}
          />
        }
        {cinemaToSelect ?
          <CinemaProfile
            id={cinemaToSelect.id}
            name={cinemaToSelect.name}
            region={cinemaToSelect.region}
            city={cinemaToSelect.city}
            tel={cinemaToSelect.tel}
            street={cinemaToSelect.street}
            pic={cinemaToSelect.pic}
            postcode={cinemaToSelect.postcode}
          /> : <WelcomePage />
        }
        <Footer />
      </CinemaContainer>

    )
  }
}

export default App;