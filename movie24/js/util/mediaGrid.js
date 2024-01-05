import { cleanUpTitle } from "../util/url.js";
import { grid } from "../components/grid.js";
import { BASE, MOVIE, PERSON, TV } from "../main.js";

export function mapMedia(media, type) {
  if (!type) {
    type = media.media_type;
  }
  if (type === "movie") {
    return {
      title: media.title,
      url: BASE + MOVIE + "/" + cleanUpTitle(media.title) + "-" + media.id,
      image: media.poster_path,
      date: media.release_date,
      score: media.vote_average,
      type: media.media_type,
    };
  } else if (type === "tv") {
    return {
      title: media.name,
      url: BASE + TV + "/" + cleanUpTitle(media.name) + "-" + media.id,
      image: media.poster_path,
      date: media.first_air_date,
      score: media.vote_average,
      type: media.media_type,
    };
  } else if (type === "person") {
    return {
      title: media.name,
      url: BASE + PERSON + "/" + cleanUpTitle(media.name) + "-" + media.id,
      image: media.profile_path,
      date: media.known_for_department,
      type: media.media_type,
    };
  }
}

export function showErrorOrGrid(data, errorMessage, type) {
  if (data.error) {
    return $("<div>" + errorMessage + "</div>");
  } else if (data.results) {
    if (data.results.length < 1) {
      return false;
    }
    return grid(data.results.map((media) => mapMedia(media, type)));
  } else {
    return grid(data.map((media) => mapMedia(media, type)));
  }
}
