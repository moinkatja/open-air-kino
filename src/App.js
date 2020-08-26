import React, { Component } from 'react';
import "./App.css";
import Title from "../src/Components/Title/Title";
import SearchForm from "./Components/SearchForm/SearchForm";
import Results from "../src/Components/Results/Results";
import CinemaProfile from "./Components/CinemaProfile/CinemaProfile";
import Spinner from "./Components/Spinner/Spinner";
import config from "./config";
import WelcomePage from './Components/WelcomePage/WelcomePage';

class App extends Component {
  constructor(props) {
    super(props);
    this.selectCinema = this.selectCinema.bind(this);
    this.state = {
      cinemas: [],
      selectedCinema: null,
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    const options = {
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
      }
    }
    fetch(`${config.API_ENDPOINT}/cinemas`, options)
      .then(res => {
        if (!res.ok) {
          throw new Error('Something went wrong, please try again later.');
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          cinemas: data,
          error: null,
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
          loading: false
        });
      });


    /*     const cinemaToShow = this.state.cinemas[0].id|| null;
        this.setState({
          ...this.state,
          selectedCinema: cinemaToShow
        });  
     */

  }

  selectCinema(cinemaId) {
    if (cinemaId) {
      this.setState({
        ...this.state,
        selectedCinema: cinemaId
      });
    }
  }

  getCity = async (e) => {
    e.preventDefault();
    const city = e.target.value;
    this.setState({ ...this.state, loading: true });
    fetch(`${config.API_ENDPOINT}/search?city=${city}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          cinemas: data,
          error: null,
          loading: false
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
      const filteredCinemas = this.state.cinemas.filter((cinema) => cinema.id === this.state.selectedCinema);
      if (filteredCinemas.length > 0) {
        cinemaToSelect = filteredCinemas[0];
      }
    }

    return (
      <div className="App">
        <div className="MainForm">
          <Title />
          <SearchForm getCity={this.getCity} />
          {this.state.loading ? <Spinner /> : <Results
            cinemas={this.state.cinemas}
            activeCinema={this.state.selectedCinema}
            cinemaToSelect={this.selectCinema} />
          }

          {cinemaToSelect ?
            <CinemaProfile
              name={cinemaToSelect.name}
              city={cinemaToSelect.city}
              tel={cinemaToSelect.tel}
              street={cinemaToSelect.street}
              pic={cinemaToSelect.pic}
            /> : <WelcomePage/>
          }

        </div>
      </div>
    )
  }

}

export default App;