export const getFavs = (cinemas, favs) => {
    return cinemas.filter(cinema => favs.includes(cinema.id));
}

export const getCinemaRegion = (cinemas, reg) => {
    return cinemas.filter((cinema) => cinema.region === reg)
}

export const getCinemaDetails = (cinemas, id) => {
   return cinemas.find((cinema) => cinema.id === id)
}

export const calculateCurrentPage = (id, resultsPerPage) => {
    return  Math.ceil(id / resultsPerPage)
}

export const getResultsPerPage = () => {
    let results;
    if (window.innerHeight > "1300") {
        results = 8;
    }
    else if (window.innerHeight > "1200") {
        results = 7;
    }
    else if (window.innerHeight > "900") {
        results = 6;
    }
    else if (window.innerHeight > "770") {
        results = 5;
    }
    else results = 4;
    return results;
}
