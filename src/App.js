import React, { Component } from 'react';
import "./App.css";
import Title from "../src/Components/Title/Title";
import SearchForm from "./Components/SearchForm/SearchForm";
import Results from "../src/Components/Results/Results";
import CinemaProfile from "./Components/CinemaProfile/CinemaProfile";
import Spinner from "./Components/Spinner/Spinner";
import WelcomePage from './Components/WelcomePage/WelcomePage';
import Favorites from './Components/Favorites/Favorites';
import { getCinemas } from "./getCinemas";

class App extends Component {
  constructor(props) {
    super(props);
    this.selectCinema = this.selectCinema.bind(this);
    this.toggleFavorite = this.toggleFavorite.bind(this);
    this.state = {
      cinemas: [],
      favorites: [],
      selectedCinema: null,
      liked: false,
      loading: false,
      error: null,
    };
  }

  componentDidMount() {

    const city="";

    this.setState({
      loading: true,
    });

    getCinemas(city).then(data => {
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

  selectCinema = (cinemaId) => {
    if (cinemaId) {
      this.setState({
        ...this.state,
        selectedCinema: cinemaId
      });
    }
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
    //console.log(this.state.selectedCinema)
  }


  render() {
    //console.log(this.state.favorites)
    let cinemaToSelect;
    if (this.state.selectedCinema) {
      cinemaToSelect = this.state.cinemas.find((cinema) => cinema.id === this.state.selectedCinema);
    }

    return (
      <div className="App">
        <div className="MainForm">
          <Title />
          <SearchForm getCity={this.getCity} />
          <Favorites favorites={this.state.favorites} />
          {this.state.loading ? <Spinner /> : <Results
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
            /> : <WelcomePage />
          }

        </div>
      </div>
    )
  }

}

export default App;