export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Retorna a mensagem de erro ou null se estiver tudo certo
export function validateGame({ title, platform, rating }) {
  if (!title.trim()) return "Informe o título do jogo.";
  if (!platform.trim()) return "Informe a plataforma.";

  const n = Number(rating.replace(",", "."));
  if (rating.trim() === "" || isNaN(n) || n < 0 || n > 10) {
    return "A nota deve ser um número de 0 a 10.";
  }
  return null;
}
