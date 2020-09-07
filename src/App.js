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
    this.state = {
      cinemas: [],
      cinemasInitial: [],
      favorites: [],
      selectedCinema: null,
      liked: false,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    const city = " ";
    this.setState({
      loading: true,
    });

    getCinemas(city)
      .then(data => {
        this.setState({
          cinemas: data,
          cinemasInitial: data,
          error: null,
          loading: false,
        });
      })

      .catch(err => {
        this.setState({
          //cinemas: null,
          error: err.message,
          loading: false
        });
      });

    //this.baseState = this.state.cinemas;

  }

  selectCinema = (cinemaId) => {
    if (cinemaId) {
      this.setState({
        //...this.state,
        selectedCinema: cinemaId
      });

    }
  }

  showFavorites = () => {

    console.log(this.state.favorites);

    const favoritesArray = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      favoritesArray.push(this.state.cinemasInitial.find((cinema) => cinema.id === this.state.favorites[i]));
    }
      this.setState({
        cinemas: favoritesArray,
        // selectedCinema: cinemaId
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
    this.baseState = this.state.favorites;
  }

  getCity = (e) => {
    e.preventDefault();
    const city = e.target.value;
    this.setState({
      loading: true,
    });
    getCinemas(city)
      .then(data => {
        this.setState({
          cinemas: data,
          error: null,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          loading: false
        });
      });
  }


  render() {
  
    let cinemaToSelect;
    if (this.state.selectedCinema) {
      cinemaToSelect = this.state.cinemas.find((cinema) => cinema.id === this.state.selectedCinema);
    } else {
      cinemaToSelect = this.state.cinemas.find((cinema) => cinema.id >= 0);
    }
    console.log(cinemaToSelect)
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
              cinemas={this.state.cinemas}
              activeCinema={this.state.selectedCinema}
              cinemaToSelect={this.selectCinema}
              favorites={this.toggleFavorite}
              liked={this.state.favorites}
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
          <Footer/>
        </div>
      </div>
    )
  }

}

export default App;