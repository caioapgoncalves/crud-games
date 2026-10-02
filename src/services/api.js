import axios from "axios";

export const MOCKAPI_BASE = "https://6abd40c85121d616d90cd3e6.mockapi.io/api/v1/games";

// Cliente Axios para o MockAPI (jogos)
export const gamesHttp = axios.create({
  baseURL: MOCKAPI_BASE,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// Cliente Axios para o ReqRes (login)
export const authHttp = axios.create({
  baseURL: "https://reqres.in/api",
  timeout: 10000,
  headers: {
    "x-api-key": "reqres-free-v1",
    "Content-Type": "application/json",
  },
});
