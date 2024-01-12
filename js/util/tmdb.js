import { renderError } from "../pages/error.js";
import { BASE, ERROR } from "../main.js";
const BASE_API_URI = "https://api.themoviedb.org/3/";

export async function tmdb(url) {
  let headers = new Headers();
  headers.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZGEyOGQ3Y2NlNDliNjg3NDlhMThmZTA0MzY3MDNjNSIsInN1YiI6IjY1ODAxOGUyYmYwZjYzMDg5MzYxZjE5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IjEWQD7saim0xmSPW-O9JWFjTtIVk5ryl-Xdo9uFwPw"
  );
  let requestOptions = {
    method: "GET",
    headers,
  };
  return fetch(BASE_API_URI + url, requestOptions)
    .then((response) => {
      if (response.ok && response.status >= 200 && response.status <= 300) {
        return response.json();
      } else {
        throw { status: response.status };
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      if (error.message) {
        if (error.message === "Failed to fetch") {
          window.location.hash = BASE + ERROR;
        }
        return { error: error.message };
      }
      if (error.status === 401) {
        return {
          error: "Something went wrong, please contact site administration.",
        };
      } else {
        return {
          error: "Something went terribly wrong",
        };
      }
    });
}
