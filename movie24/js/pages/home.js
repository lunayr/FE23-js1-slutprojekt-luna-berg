import { tabs } from "../components/tabs.js";
import { tmdb } from "../util/tmdb.js";
import { container } from "../components/container.js";
import { showErrorOrGrid } from "../util/mediaGrid.js";

async function homeLoader() {
  return {
    movie: {
      popular: await tmdb("movie/popular"),
      top: await tmdb("movie/top_rated"),
    },
    tv: {
      popular: await tmdb("tv/popular"),
      top: await tmdb("tv/top_rated"),
    },
  };
}

export async function renderHome() {
  $("#root").html("");
  const data = await homeLoader();

  let movieTabContent = [
    {
      id: "movie_popular",
      title: "Popular",
      content: showErrorOrGrid(data.movie.popular, "No movie found", "movie"),
    },
    {
      id: "movie_top",
      title: "Top Rated",
      content: showErrorOrGrid(data.movie.top, "No movie found", "movie"),
    },
  ];
  let tvTabContent = [
    {
      id: "tv_popular",
      title: "Popular",
      content: showErrorOrGrid(data.tv.popular, "No tv show found", "tv"),
    },
    {
      id: "tv_top",
      title: "Top Rated",
      content: showErrorOrGrid(data.tv.top, "No tv show found", "tv"),
    },
  ];

  $("#root").append(
    container("bottom-padding").append(
      $("<h2>Movies</h2>"),
      tabs(movieTabContent),
      $("<h2>TV Shows</h2>"),
      tabs(tvTabContent)
    )
  );
}
