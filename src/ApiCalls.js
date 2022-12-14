import axios from "axios";

const beersAPI = axios.create({
  baseURL: "https://api.punkapi.com/v2",
});

export const getBeers = (Page = "?page=1", Per_page = "&per_page=25") => {
  return beersAPI
    .get(`/beers${Page}${Per_page}`, { params: { Page, Per_page } })
    .then((response) => {
      return response.data;
    });
};
