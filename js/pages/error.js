import { container } from "../components/container.js";

export async function renderError() {
  $("#root").html("");
  const errorPage = container("error-page");

  errorPage.append(
    "<sl-icon name='exclamation-triangle'></sl-icon>",
    "<h1>Something went wrong</h1>",
    "<p>Please contact website administrator or try again later.</p>",
    "<a href='#/home'><sl-button>Go Home</sl-button><a/>"
  );

  $("#root").append(errorPage);
}
