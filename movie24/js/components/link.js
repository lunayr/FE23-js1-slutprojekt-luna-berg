import { cleanUpTitle } from "../util/url.js";

export function link(base, type, text, id) {
  return $(
    `<a href="${base + type + "/" + cleanUpTitle(text) + "-" + id}">${text}</a>`
  );
}
