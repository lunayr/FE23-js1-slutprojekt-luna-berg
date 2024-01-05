import { hero } from "../components/hero.js";
import { tmdb } from "../util/tmdb.js";
import { getIdFromUrl } from "../util/url.js";
import { BASE, ERROR, PERSON } from "../main.js";
import { showErrorOrGrid } from "../util/mediaGrid.js";
import { container } from "../components/container.js";

async function personLoader(id) {
  let person = await tmdb("person/" + id);
  let credits = await tmdb("search/multi?query=" + person.name);
  if (credits.error) {
    return {
      person,
      credits: { error: "No credits given" },
    };
  } else {
    return {
      person,
      credits: credits.results[0].known_for,
    };
  }
}

export async function renderPerson(url) {
  $("#root").html("");

  const id = getIdFromUrl(url);
  const data = await personLoader(id);

  if (data.person.error) {
    window.location.hash = BASE + ERROR;
  }

  let personData = {
    title: data.person.name,
    image_url: data.person.profile_path,
    description: data.person.biography,
    cover: data.person.profile_path,
    details: {
      Birthday: data.person.birthday,
      "Known for": data.person.known_for_department,
      "Place of Birth": data.person.place_of_birth,
    },
  };


  let recommendationGrid = showErrorOrGrid(data.credits, "No recommendation");

  let mediaCard = hero(personData);

  $("#root").append(
    mediaCard,
    createContainer.append(
      recommendationGrid
        ? container("bottom-padding").append(
            $("<h2>Known for</h2>"),
            recommendationGrid
          )
        : null
    )
  );
}
