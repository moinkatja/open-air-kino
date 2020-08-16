
import React, { Component } from 'react';
import Result from "./Result/Result";
import classes from "./Results.module.css";
import kino1 from  "../../img/kino1.jpeg";
import kino2 from  "../../img/kino2.jpg";
import kino3 from  "../../img/kino3.jpg";


class Results extends Component {
    state = {
        cinemas: [
            { id: "abc", name: "Cinema1", city:"Hamburg", tel: 2812121, pic: kino1},
            { id: "123", name: "Kino2", city:"Hamburg", tel: 3232321, pic: kino2 },
            { id: "nhz", name: "TestKino", city:"Hamburg", tel: 22232321, pic: kino3 },
            { id: "nh122", name: "HelloKino", city:"Hamburg", tel: 1222 }
        ],
    };
    render() {
        let cinemas = null;
        cinemas = (<div>
            {this.state.cinemas.map((cinema) => {
                return (
                <Result className={classes.ResultItem}
                    name={cinema.name}
                    tel={cinema.tel}
                    pic={cinema.pic}
                    city={cinema.city}
                    key={cinema.id}
                />
                )
            })}
        </div>
        )

        return (
            <div className={classes.Results} >
                {cinemas}
            </div>
        )
    }
}


export default Results


