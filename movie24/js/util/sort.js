export function sortCastByPopularity(first_cast, second_cast) {
  return second_cast.popularity - first_cast.popularity;
}

export function sortCastByName(first_cast, second_cast) {
  return second_cast.name - first_cast.name ? 1 : -1;
}
