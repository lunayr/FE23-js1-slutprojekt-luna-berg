import { renderError } from "./pages/error.js";
import { renderHome } from "./pages/home.js";
import { renderMovie } from "./pages/movie.js";
import { renderPerson } from "./pages/person.js";
import { renderSearch } from "./pages/search.js";
import { renderTV } from "./pages/tv.js";
import { cleanUpTitle, isPositiveInteger } from "./util/url.js";

export const BASE = "#/";
export const HOME = "home";
export const ERROR = "error";
export const SEARCH = "search";
export const MOVIE = "movie";
export const TV = "tv";
export const PERSON = "person";

/**
 * Homepage: ...#/home
 * Error:    ...#/error
 * Search:   ...#/search/query?page=1039
 * Movie:    ...#/movie/movie-name-120292
 * Tv:       ...#/tv/tv-name-120292
 * Person:   ...#/person/person-name-120292
 */

function handleNavigation() {
  window.scrollTo(0, 0);
  let hash = window.location.hash;
  if (!hash) {
    window.location.hash = BASE + HOME;
  }


  // [#, movie, movie-name-122343]
  let [, module, query, page] = hash.split("/");

 
  if (query && (module === HOME || module === ERROR)) {
    window.location.hash = BASE + HOME;
  }
  
  if (
    !query &&
    (module === MOVIE ||
      module === TV ||
      module === SEARCH ||
      module === PERSON)
  ) {
    window.location.hash = BASE + HOME;
  }
  switch (module) {
    case HOME:
      renderHome();
      break;
    case ERROR:
      renderError();
      break;
    case SEARCH:
      if (!isPositiveInteger(page)) {
        window.location.hash = BASE + HOME;
      } else {
        renderSearch(query, page);
      }
      break;
    case MOVIE:
      renderMovie(query);
      break;
    case TV:
      renderTV(query);
      break;
    case PERSON:
      renderPerson(query);
      break;
    default:
      renderError();
      break;
  }
}

function handleSearch(event) {
  event.preventDefault();
  let query = $("#nav-search_input").val(); //val() gets the value of input.
  window.location.hash = BASE + SEARCH + "/" + cleanUpTitle(query) + "/1"; //1 is the first page of results.
}

$("#nav-search").on("submit", handleSearch);

$(window).on("hashchange", handleNavigation);

//Initialize Navigation
handleNavigation();
