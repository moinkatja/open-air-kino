import React, { Component } from 'react';
import Title from "../Title/Title";
import Results from "../Results/Results";
import CinemaProfile from "../CinemaProfile/CinemaProfile";
import Spinner from "../Spinner/Spinner";
import WelcomePage from '../WelcomePage/WelcomePage';
import Footer from "../Footer/Footer";

class CinemaContainer extends Component {

    render() {
        let cinemaToShow;
        cinemaToShow = this.props.cinemas.find((cinema) => cinema.id === this.props.cinemaId);

        return (
            <section className="App">
                <div className="Container">
                    <Title />
                    {this.props.loading ? <Spinner /> :
                        <Results
                            tab={this.props.tab}
                            cinemaId={this.props.cinemaId}
                            error={this.props.error}
                            cinemas={this.props.cinemas}
                            //selectedCinema = {this.props.selectedCinema}
                        />
                    }

                    {cinemaToShow ?
                        <CinemaProfile
                            id={cinemaToShow.id}
                            name={cinemaToShow.name}
                            region={cinemaToShow.region}
                            city={cinemaToShow.city}
                            tel={cinemaToShow.tel}
                            street={cinemaToShow.street}
                            pic={cinemaToShow.pic}
                            postcode={cinemaToShow.postcode}
                        /> : <WelcomePage />
                    }
                    <Footer />
                </div>
            </section>
        )
    }
}

export default CinemaContainer;

