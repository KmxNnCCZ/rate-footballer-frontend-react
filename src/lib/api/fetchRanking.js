import client from "./client";

export const getPlayerRanking = () => {
  return client.get("ranking");
}

