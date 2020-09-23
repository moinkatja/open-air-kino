import React from 'react';
import classes from './Pagination.module.css';

const Pagination = (props) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(props.cinemas.length / props.resultsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (pageNumbers.length === 1) return "";

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li className={(props.currentPage === number ? 'PageNumberActive' : 'PageNumberNotActive')}
                key={number}
                id={number}
                onClick={props.clickedPage}
            >
                {number}
            </li>
        );
    });

    return (
        <div className={classes.Pagination}>
            {renderPageNumbers}
        </div>
    )
}

export default Pagination
