function getResultsPerPage() {
    let results;
    if (window.innerWidth > "1000") {
        if (window.innerHeight > "1320") results = 9;
        else if (window.innerHeight > "1200") results = 7;
        else if (window.innerHeight > "1000") results = 6;
        else results = 5;
    } else if (window.innerWidth < "1000" && window.innerWidth > "750") {
        if (window.innerHeight > "900") results = 6
        else results = 5;
    }
    else results = 5;
    return results;
}

export { getResultsPerPage };