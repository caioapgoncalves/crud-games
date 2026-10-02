import { gamesHttp } from "./api";

// READ - lista todos os jogos
export async function listGames() {
  const { data } = await gamesHttp.get("");
  return data;
}

// CREATE - cadastra um jogo
export async function createGame(game) {
  const { data } = await gamesHttp.post("", game);
  return data;
}

// UPDATE - altera um jogo pelo id
export async function updateGame(id, game) {
  const { data } = await gamesHttp.put(`/${id}`, game);
  return data;
}

// DELETE - exclui um jogo pelo id
export async function deleteGame(id) {
  await gamesHttp.delete(`/${id}`);
}
