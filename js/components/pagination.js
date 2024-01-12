import { container } from "./container.js";

const paginationButton = (url, text) => {
  if (text === "First") text = "<sl-icon name='chevron-double-left'></sl-icon>";
  if (text === "Prev") text = "<sl-icon name='chevron-left'></sl-icon>";
  if (text === "Next") text = "<sl-icon name='chevron-right'></sl-icon>";
  if (text === "Last") text = "<sl-icon name='chevron-double-right'></sl-icon>";

  return $(
    `
      <a href=" ${url}">
        <sl-button variant="text" size="medium" ${"circle"}>
            ${text}
        </sl-button>
      </a>
      `
  );
};

export function pagination(maxPage) {
  
  let hash = window.location.hash;
  let urlParts = hash.split("/");
  let page = Number(urlParts.pop()); 

  const createUrlFromNumber = (number) => urlParts.join("/") + "/" + number;

  if (maxPage < 2) {
    return $("");
  }

  let paginationContainer = container();
  paginationContainer.addClass("pagination");

  if (page > 1) {
    paginationContainer.append(
      paginationButton(createUrlFromNumber(1), "First"),
      paginationButton(createUrlFromNumber(page - 1), "Prev"),
      paginationButton(createUrlFromNumber(page - 1), page - 1)
    );
  }
  let currentPageButton = paginationButton(createUrlFromNumber(page), page);
  currentPageButton.addClass("active");
  paginationContainer.append(currentPageButton);

  if (maxPage > page) {
    paginationContainer.append(
      paginationButton(createUrlFromNumber(page + 1), page + 1),
      paginationButton(createUrlFromNumber(page + 1), "Next"),
      paginationButton(createUrlFromNumber(maxPage), "Last")
    );
  }

  return paginationContainer;
}

//#/search/ssss/1
//[#,search,ssss,1]
//[#,search,ssss] , 1
//[#,search,ssss].join("/") => "#/search/ssss"

//#/search/ssss/2
