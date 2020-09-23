import React, { Component, Fragment } from 'react';
import "./App.css";
import CinemaContainer from "../src/Components/CinemaContainer/CinemaContainer";
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
      <Fragment>
        <Modal
          show={this.state.error ? true : false}
          errorMessage={this.state.error}
          modalClosed={this.clearError}
        />
        <CinemaContainer
          loading={this.state.loading}
          cinemas={this.state.cinemas}
          tab={this.props.tab}
          cinemaId={this.props.cinemaId}
        />
      </Fragment>
    )
  }
}

export default App;