import { hero } from "../components/hero.js";
import { tmdb } from "../util/tmdb.js";
import { getIdFromUrl } from "../util/url.js";
import { BASE, ERROR, PERSON } from "../main.js";
import { showErrorOrGrid } from "../util/mediaGrid.js";
import { container } from "../components/container.js";
import { link } from "../components/link.js";
import { sortCastByName, sortCastByPopularity } from "../util/sort.js";

async function tvLoader(id) {
  return {
    tv: await tmdb("tv/" + id),
    cast: await tmdb("tv/" + id + "/credits"),
    recommendations: await tmdb("tv/" + id + "/recommendations"),
  };
}

export async function renderTV(url) {
  $("#root").html("");

  const id = getIdFromUrl(url);
  const data = await tvLoader(id);

  if (data.tv.error) {
    window.location.hash = BASE + ERROR;
  }
  let tvData = {
    title: data.tv.name,
    image_url: data.tv.poster_path,
    description: data.tv.overview,
    cover: data.tv.backdrop_path,
    details: {
      "First Air Date": data.tv.first_air_date,
      "# of Episodes": data.tv.number_of_episodes,
      Genre: data.tv.genres.map((genre) => genre.name),
      Country: data.tv.production_countries.map((country) => country.name),
      Cast: data.cast.cast
        .sort(sortCastByPopularity)
        .slice(0, 4)
        .sort(sortCastByName)
        .map((member) => link(BASE, PERSON, member.name, member.id)),
      Production: data.tv.production_companies.map((company) => company.name),
    },
  };

  let recommendationGrid = showErrorOrGrid(
    data.recommendations,
    "No recommendation"
  );

  let mediaCard = hero(tvData);

  $("#root").append(
    mediaCard,
    container().append(
      recommendationGrid
        ? container("bottom-padding").append(
            $("<h2>You might also like</h2>"),
            recommendationGrid
          )
        : null
    )
  );
}
