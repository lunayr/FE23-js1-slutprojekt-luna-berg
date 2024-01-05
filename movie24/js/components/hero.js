import { detail } from "./detail.js";
const FALLBACK_IMG = "./assets/empty.jpg";
const COVER_IMG_BASE = "https://image.tmdb.org/t/p/w1280/";
const POSTER_IMG_BASE = "https://image.tmdb.org/t/p/w185/";

export function hero(media) {
  let hero = $("<div class='hero'></div>");
  let cover = $(
    `<div class='cover' style='background-image:url(${
      media.cover ? COVER_IMG_BASE + media.cover : FALLBACK_IMG
    })'></div>`
  );
  let mediaCard = $("<div class='mediaCard container'></div>");
  let poster = $(
    `<div class='mediaCard_poster'><img src="${
      media.image_url ? POSTER_IMG_BASE + media.image_url : FALLBACK_IMG
    }"/></div>`
  );
  let mediaCardContent = $("<div class='mediaCard_content'></div>");
  let mediaCardContentInner = $("<div class='mediaCard-content_inner'></div>");
  let title = $(`<h1>${media.title}</h1>`);
  let description = $(`<p>${media.description}</p>`);
  let detailsWrapper = $("<div class='details'></div>");
  Object.keys(media.details).forEach((key) => {
    detailsWrapper.append(detail(key, media.details[key]));
  });

  mediaCardContentInner.append(title, description);
  mediaCardContent.append(mediaCardContentInner, detailsWrapper);
  mediaCard.append(poster, mediaCardContent);
  hero.append(cover, mediaCard);

  return hero;
}
