import { hero } from "../components/hero.js";
import { tmdb } from "../util/tmdb.js";
import { getIdFromUrl } from "../util/url.js";
import { BASE, ERROR, PERSON } from "../main.js";
import { showErrorOrGrid } from "../util/mediaGrid.js";
import { container } from "../components/container.js";
import { link } from "../components/link.js";
import { sortCastByName, sortCastByPopularity } from "../util/sort.js";

async function movieLoader(id) {
  return {
    movie: await tmdb("movie/" + id),
    cast: await tmdb("movie/" + id + "/credits"),
    recommendations: await tmdb("movie/" + id + "/recommendations"),
  };
}

export async function renderMovie(url) {
  $("#root").html("");

  const id = getIdFromUrl(url);
  const data = await movieLoader(id);

  if (data.movie.error) {
    window.location.hash = BASE + ERROR;
  }

  let movieData = {
    title: data.movie.title,
    image_url: data.movie.poster_path,
    description: data.movie.overview,
    cover: data.movie.backdrop_path,
    details: {
      "Release Date": data.movie.release_date,
      Duration: data.movie.runtime + " min",
      Genre: data.movie.genres.map((genre) => genre.name),
      Country: data.movie.production_countries.map((country) => country.name),
      Cast: data.cast.cast
        .sort(sortCastByPopularity)
        .slice(0, 4)
        .sort(sortCastByName)
        .map((member) => link(BASE, PERSON, member.name, member.id)),
      Production: data.movie.production_companies.map(
        (company) => company.name
      ),
    },
  };

  let recommendationGrid = showErrorOrGrid(
    data.recommendations,
    "No recommendation"
  );

  let mediaCard = hero(movieData);

  $("#root").append(
    mediaCard,
    recommendationGrid
      ? container("bottom-padding").append(
          $("<h2>You might also like</h2>"),
          recommendationGrid
        )
      : null
  );
}
