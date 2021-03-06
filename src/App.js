import React, { Component, Fragment } from 'react';
import "./App.css";
import CinemaMainForm from "./Components/CinemaMainForm/CinemaMainForm";
import Modal from "./Components/UI/Modal/Modal";
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
        if (this._isMounted) {
          this.setState({
            cinemas: data,
            loading: false,
          });
        }
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
          show={!!this.state.error}
          errorMessage={this.state.error}
          modalClosed={this.clearError}
        />
        <CinemaMainForm
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