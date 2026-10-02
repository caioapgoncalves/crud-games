import { authHttp } from "./api";

export async function loginReqRes({ email, password }) {
  const { data } = await authHttp.post("/login", { email, password });
  return data.token; // { token: "QpwL5tke4Pnpja7X4" }
}
