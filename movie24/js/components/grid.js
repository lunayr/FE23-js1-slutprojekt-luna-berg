import { card } from "./card.js";

// const exampleItems = [
//   {
//     title: "Name of the card",
//     url: "#/movie/39393",
//     image: "....jpg",
//     date: "2019",
//   },
// ];

export function grid(items) {
  let grid = $("<div class='grid'></div>");
  items.forEach((item) => {
    grid.append(card(item));
  });
  return grid;
}
