import React, { Component } from 'react';
import "./App.css";
import Title from "../src/Components/Title/Title";
import Form from "../src/Components/Form/Form";
import Results from "../src/Components/Results/Results";
import CinemaProfile from "./Components/CinemaProfile/CinemaProfile";
import kino1 from "../src/img/kino1.jpeg";
import kino2 from "../src/img/kino2.jpg";
import kino3 from "../src/img/kino3.jpg";


class App extends Component {
  constructor(props) {
    super(props);
    this.selectCinema = this.selectCinema.bind(this);
    this.state = {
      cinemas: [
        { id: "0", name: "Cinema1", city: "Hamburg", street:"Ringstr. 1", tel: 2812121, pic: kino1 },
        { id: "1", name: "Kino2", city: "Hamburg", street:"Ringstr. 5", tel: 3232321, pic: kino2 },
        { id: "2", name: "TestKino", city: "Hamburg", street:"Helloring. 56", tel: 22232321, pic: kino3 },
        { id: "3", name: "HelloKino", city: "Hamburg", street:"Abcstrasse 16", tel: 12223434, pic: kino2 }
      ],
      selectedCinema: null,
    };
  }


  getCinemas = (e) => {
    e.preventDefault();
    this.setState({
      cinemas: [
        { id: "0", name: "Cinema1", city: "Hamburg", street:"Ringstr. 1", tel: 2812121, pic: kino1 },
        { id: "1", name: "Kino2", city: "Hamburg", street:"Ringstr. 5", tel: 3232321, pic: kino2 },
        { id: "2", name: "TestKino", city: "Hamburg", street:"Helloring. 56", tel: 22232321, pic: kino3 },
        { id: "3", name: "HelloKino", city: "Hamburg", street:"Abcstrasse 16", tel: 12223434, pic: kino2 }
      ],
      selectedCinema: null,
    })
  }

  selectCinema(cinemaId) {
    if (cinemaId) {
      this.setState({
        ...this.state,
        selectedCinema: cinemaId
      });
    }
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
          <Form getCinemas={this.getCinemas} />
          <Results
            cinemas={this.state.cinemas}
            activeCinema={this.state.selectedCinema}
            cinemaToSelect={this.selectCinema} />
          {
            cinemaToSelect ?
              <CinemaProfile
                name={cinemaToSelect.name}
                city={cinemaToSelect.city}
                tel={cinemaToSelect.tel}
                pic={cinemaToSelect.pic}
                street={cinemaToSelect.street}
                 /> : null
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const cinemaToShow = this.state.cinemas[0].id || null;
    this.setState({
      ...this.state,
      selectedCinema: cinemaToShow
    });
  }

}

export default App;