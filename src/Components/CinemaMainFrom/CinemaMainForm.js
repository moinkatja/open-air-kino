import React, { Component } from 'react';
import Title from "../Title/Title";
import Results from "../Results/Results";
import Spinner from "../Spinner/Spinner";
import Footer from "../Footer/Footer";

class CinemaMainForm extends Component {

    render() {
        return (
            <div className="Container">
                <Title />
                {this.props.loading ? <Spinner /> :
                    <Results
                        tab={this.props.tab}
                        cinemaId={this.props.cinemaId}
                        error={this.props.error}
                        cinemas={this.props.cinemas}
                    />
                }
                <Footer />
            </div>
        )
    }
}

export default CinemaMainForm;

