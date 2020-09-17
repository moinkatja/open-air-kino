export const getFavs = (cinemas, favs) => {
    return cinemas.filter(cinema => favs.includes(cinema.id));
}