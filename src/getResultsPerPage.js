function getResultsPerPage() {
    let results;
    if (window.innerHeight > "1000") {
        results = 6;
    } else if (window.innerHeight  > "770") {
        results = 5;
    } 
    else results = 4;
    return results;
}

export { getResultsPerPage };