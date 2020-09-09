import React, { Component } from 'react';
import "./App.css";
import Title from "../src/Components/Title/Title";
import SearchForm from "./Components/SearchForm/SearchForm";
import Results from "../src/Components/Results/Results";
import CinemaProfile from "./Components/CinemaProfile/CinemaProfile";
import Spinner from "./Components/Spinner/Spinner";
import WelcomePage from './Components/WelcomePage/WelcomePage';
import Favorites from './Components/Favorites/Favorites';
import Footer from "./Components/Footer/Footer"
import { getCinemas } from "./getCinemas";

class App extends Component {
  constructor(props) {
    super(props);

    this.selectCinema = this.selectCinema.bind(this);
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
      error: null,
      filter: "",
      currentPage: 1,
      resultsPerPage: 5
    };
  }

  componentDidMount() {
    const getFavs = JSON.parse(localStorage.getItem("favorites")) || "[]";
    const getLikes = JSON.parse(localStorage.getItem("likes")) || "false";
    const city = " ";
    this.setState({
      loading: true,
      favorites: []
    });

    getCinemas(city)
      .then(data => {
        this.setState({
          cinemas: data,
          cinemasInitial: data,
          error: null,
          loading: false,
          favorites: getFavs,
          liked: getLikes,
        });
      })

      .catch(err => {
        this.setState({
          error: err.message,
          loading: false,
          cinemas: [{ "_id": "5f3fd4baf6710a7aaf67bc32", "id": "0", "name": "TestKino", "postcode": 123456, "city": "Berlin", "street": "Abcstr. 124", "tel": "12334562", "pic": "https://i.postimg.cc/MTWJSP29/kino1.jpg", "__v": 0 }, { "_id": "5f3fd528f6710a7aaf67bc33", "id": "1", "name": "Cinema2", "postcode": 145732, "city": "Hamburg", "street": "Helloworldstr. 124", "tel": "23233-343", "pic": "https://i.postimg.cc/zvcsTqLQ/kino2.jpg", "__v": 0 }],
        });
      });

  }

  selectCinema = (cinemaId) => {
    if (cinemaId) {
      this.setState({
        selectedCinema: cinemaId
      });

    }
  }

  showFavorites = () => {
    const favoritesArray = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      favoritesArray.push(this.state.cinemasInitial.find((cinema) => cinema.id === this.state.favorites[i]));
    }
    this.setState({
      cinemas: favoritesArray,
      currentPage: 1,
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

  handlePageClick(e) {
    e.preventDefault();
    const pageNum = Number(e.target.id);
    this.setState({
      currentPage: pageNum
    });
  }

  getCity = (e) => {
    e.preventDefault();
    const city = e.target.value;
    this.setState({
      loading: true,
      currentPage: 1,
    });

    if (city === "") {
      this.setState({
        loading: false,
        cinemas: this.state.cinemasInitial
      })
    }
    else {
      const filteredData = this.state.cinemasInitial.filter((cinema) => cinema.city === city);
      this.setState({
        loading: false,
        cinemas: filteredData
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    localStorage.setItem("likes", JSON.stringify(this.state.liked));
  }

  render() {
    let cinemaToSelect;
    if (this.state.selectedCinema) {
      cinemaToSelect = this.state.cinemas.find((cinema) => cinema.id === this.state.selectedCinema);
    } else {
      cinemaToSelect = this.state.cinemas.find((cinema) => cinema.id >= 0);
    }

    return (
      <div className="App">
        <div className="MainForm">
          <Title />
          <SearchForm getCity={this.getCity} cinemasInitial={this.state.cinemasInitial} />
          <Favorites
            favorites={this.state.favorites}
            selectedCinema={this.selectCinema}
            cinemas={this.showFavorites}
          />

          {this.state.loading ? <Spinner /> :

            <Results
              error={this.state.error}
              cinemas={this.state.cinemas}
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
              city={cinemaToSelect.city}
              tel={cinemaToSelect.tel}
              street={cinemaToSelect.street}
              pic={cinemaToSelect.pic}
              postcode={cinemaToSelect.postcode}
            /> : <WelcomePage />
          }
          <Footer />
        </div>
      </div>
    )
  }
}

export default App;