import client from "./client";

// client.httpメソッド（path, params）

// 試合を取得する
export const getMatch = (params) => {
  console.log(params);
  return  client.get("matches", { params });
}