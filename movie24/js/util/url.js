//Source: cant find it again.
export function cleanUpTitle(title) {
  return title
    .replace("&", "and") // replaces all & with and
    .replace(/[^a-zA-Z0-9 ]/g, "") // removes all charachters that are not a to z, A to Z or space
    .toLowerCase() //make all char lowercase
    .replace(/\s+/g, " ") //replace all duplicate space with single space "  " => " "
    .replaceAll(" ", "-"); //replace all " " with -
}

export function getIdFromUrl(url) {
  //rebel-moon-part-one-a-child-of-fire-848326
  let urlParts = url.split("-");

  return urlParts[urlParts.length - 1];
}

//Source: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
export function isPositiveInteger(str) {
  if (typeof str != "string") return false;
  return (
    !isNaN(str) &&
    !isNaN(parseFloat(str)) &&
    Number.isInteger(Number(str)) &&
    Number(str) > 0
  );
}
