import { container } from "../components/container.js";
import { pagination } from "../components/pagination.js";
import { showErrorOrGrid } from "../util/mediaGrid.js";
import { tmdb } from "../util/tmdb.js";

async function searchLoader(query, page) {
  return {
    searchResults: await tmdb(
      "search/multi?query=" + query.replaceAll("-", " ") + "&page=" + page
    ),
  };
}

export async function renderSearch(query, page) {
  $("#root").html("");
  let data = await searchLoader(query, page);

  let searchGrid = showErrorOrGrid(
    data.searchResults,
    "No search results found"
  );

  let searchHeader = $("<div class='search-header'></div>");

  searchHeader.append(
    $("<h1 class='search'>Search Results</h1>"),
    $(`<p>${data.searchResults.total_results || 0} results found</p>`)
  );

  $("#root").append(
    container().append(
      searchHeader,
      pagination(data.searchResults.total_pages),
      searchGrid,
      pagination(data.searchResults.total_pages)
    )
  );
}
