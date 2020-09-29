import React, { Component } from 'react';
import Title from "./Title/Title";
import Results from "./Results/Results";
import Spinner from "../UI/Spinner/Spinner";
import Footer from "./Footer/Footer";

class CinemaMainForm extends Component {
    render() {
        return (
            <section className="CinemaApp">
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
            </section>
        )
    }
}

export default CinemaMainForm;

