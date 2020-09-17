import React from 'react';

function CinemaContainer(props) {
    return (
        <section className="App">
            <div className="Container">
                {props.children}
            </div>
        </section>
    )
}

export default CinemaContainer;
