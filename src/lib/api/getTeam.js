import client from "./client";

// client.httpメソッド（path, params）

// 試合を取得する
export const getTeam = (id) => {
  const params = { id };
  return  client.get("team", { params });
}