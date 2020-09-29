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
    return  Math.floor((id / resultsPerPage) + 1 )
}
