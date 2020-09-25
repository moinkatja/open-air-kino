import React, { Component } from 'react';
import "./App.css";
import CinemaMainForm from "./Components/CinemaMainFrom/CinemaMainForm";
import Modal from "./Components/Modal/Modal";
import { getCinemas } from "./getCinemas";
import SAMPLE_ARRAY from "./sampledata";

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      cinemas: [],
      error: false,
      loading: false,
    };
  }

  componentDidMount() {

    this._isMounted = true;
    this.setState({
      loading: true,
    });

    getCinemas("")
      .then(data => {
        if (data)
          this.setState({
            cinemas: data,
            loading: false,
          });
      })
      .catch(err => {
        this.setState({
          cinemas: SAMPLE_ARRAY,
          error: err.message,
          loading: false,
        });
      })
  }

  clearError = () => {
    this.setState({
      error: null
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {

    return (
      <section className="App">
        <Modal
          show={this.state.error ? true : false}
          errorMessage={this.state.error}
          modalClosed={this.clearError}
        />
        <CinemaMainForm
          loading={this.state.loading}
          cinemas={this.state.cinemas}
          tab={this.props.tab}
          cinemaId={this.props.cinemaId}
        />
      </section>
    )
  }
}

export default App;