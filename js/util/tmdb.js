const BASE_API_URI = "https://api.themoviedb.org/3/";

export async function tmdb(url) {
  let headers = new Headers();
  headers.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWQyMWRjZTUxZWQxODMxODNlMzlkNTlkNmMxYzM1ZCIsInN1YiI6IjY1ODBiYWQ3MjI2YzU2MDgxOTllNzIwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XLv4poFEocMm5RFQFoXH3vt74OpmKM5ll0f5Qn-QdpI"
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
      if (error.message) {
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
